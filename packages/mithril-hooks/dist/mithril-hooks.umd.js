(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("mithril")) : typeof define === "function" && define.amd ? define(["exports", "mithril"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.mithrilHooks = {}, global.m));
})(this, function(exports2, m) {
  "use strict";
  /*! (c) 2020 Andrea Giammarchi */
  const { parse: $parse, stringify: $stringify } = JSON;
  const Primitive = String;
  const primitive = "string";
  const object = "object";
  const noop = (_, value) => value;
  const set = (known, input, value) => {
    const index = Primitive(input.push(value) - 1);
    known.set(value, index);
    return index;
  };
  const stringify = (value, replacer, space) => {
    const $ = replacer && typeof replacer === object ? (k, v) => k === "" || -1 < replacer.indexOf(k) ? v : void 0 : replacer || noop;
    const known = /* @__PURE__ */ new Map();
    const input = [];
    const output = [];
    let i = +set(known, input, $.call({ "": value }, "", value));
    let firstRun = !i;
    while (i < input.length) {
      firstRun = true;
      output[i] = $stringify(input[i++], replace, space);
    }
    return "[" + output.join(",") + "]";
    function replace(key, value2) {
      if (firstRun) {
        firstRun = !firstRun;
        return value2;
      }
      const after = $.call(this, key, value2);
      switch (typeof after) {
        case object:
          if (after === null)
            return after;
        case primitive:
          return known.get(after) || set(known, input, after);
      }
      return after;
    }
  };
  let currentState;
  const call = Function.prototype.call.bind(Function.prototype.call);
  const scheduleRender = () => (
    // Call m within the function body so environments with a global instance of m (like flems.io) don't complain
    m.redraw()
  );
  const updateDeps = (deps) => {
    const state = currentState;
    const { depsIndex } = state;
    state.depsIndex += 1;
    const prevDeps = state.depsStates[depsIndex] || [];
    const shouldRecompute = deps === void 0 ? true : Array.isArray(deps) ? deps.length > 0 ? !deps.every((x, i) => x === prevDeps[i]) : !state.setup : false;
    if (deps !== void 0) {
      state.depsStates[depsIndex] = deps;
    }
    return shouldRecompute;
  };
  const effect = (isAsync = false) => (fn, deps) => {
    const state = currentState;
    const shouldRecompute = updateDeps(deps);
    if (shouldRecompute) {
      const { depsIndex } = state;
      const runCallbackFn = () => {
        const teardown2 = fn();
        if (typeof teardown2 === "function") {
          state.teardowns.set(
            depsIndex,
            teardown2
          );
          state.teardowns.set("_", scheduleRender);
        }
      };
      const teardown = state.teardowns.get(depsIndex);
      try {
        if (typeof teardown === "function") {
          teardown();
        }
      } finally {
        state.teardowns.delete(depsIndex);
      }
      state.updates.push(
        isAsync ? () => new Promise((resolve) => {
          requestAnimationFrame(resolve);
        }).then(runCallbackFn) : runCallbackFn
      );
    }
  };
  const updateState = (initialState, newValueFn) => {
    const state = currentState;
    const index = state.statesIndex;
    state.statesIndex += 1;
    if (!state.setup) {
      state.states[index] = initialState;
    }
    return [
      state.states[index],
      (value) => {
        const previousValue = state.states[index];
        const newValue = newValueFn ? newValueFn(value, index) : value;
        state.states[index] = newValue;
        if (stringify(newValue) !== stringify(previousValue)) {
          scheduleRender();
        }
      },
      index
    ];
  };
  const useState = (initialState) => {
    const state = currentState;
    const newValueFn = (value, index) => typeof value === "function" ? value(state.states[index], index) : value;
    return updateState(initialState, newValueFn);
  };
  const useEffect = effect(true);
  const useLayoutEffect = effect();
  function useReducer(reducer, initialState, initFn) {
    const state = currentState;
    const initValue = !state.setup && initFn ? initFn(initialState) : initialState;
    const getValueDispatch = () => {
      const [value, setValue, index] = updateState(initValue);
      const dispatch = (action) => {
        const previousValue = state.states[index];
        return setValue(
          // Next state:
          reducer(previousValue, action)
        );
      };
      return [value, dispatch];
    };
    return getValueDispatch();
  }
  const useRef = (initialValue) => {
    const [value] = updateState({
      current: initialValue
    });
    return value;
  };
  const useMemo = (fn, deps) => {
    const state = currentState;
    const shouldRecompute = updateDeps(deps);
    const [memoized, setMemoized] = !state.setup ? updateState(fn()) : updateState();
    if (state.setup && shouldRecompute) {
      setMemoized(fn());
    }
    return memoized;
  };
  const useCallback = (callback, deps) => (
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMemo(() => callback, deps)
  );
  const withHooks = (renderFunction, initialAttrs) => {
    const init = (vnode) => {
      Object.assign(vnode.state, {
        setup: false,
        states: [],
        statesIndex: 0,
        depsStates: [],
        depsIndex: 0,
        updates: [],
        cleanups: /* @__PURE__ */ new Map(),
        teardowns: /* @__PURE__ */ new Map()
        // Keep track of teardowns even when the update was run only once
      });
    };
    const update = (vnode) => {
      const prevState = currentState;
      currentState = vnode.state;
      try {
        vnode.state.updates.forEach(call);
      } finally {
        Object.assign(vnode.state, {
          setup: true,
          updates: [],
          depsIndex: 0,
          statesIndex: 0
        });
        currentState = prevState;
      }
    };
    const render = (vnode) => {
      const prevState = currentState;
      currentState = vnode.state;
      try {
        return renderFunction({
          ...initialAttrs,
          ...vnode.attrs,
          vnode,
          children: vnode.children
        });
      } catch (e) {
        console.error(e);
      } finally {
        currentState = prevState;
      }
      return void 0;
    };
    const teardown = (vnode) => {
      const prevState = currentState;
      currentState = vnode.state;
      try {
        vnode.state.teardowns.forEach(call);
      } finally {
        currentState = prevState;
      }
    };
    return {
      oninit: init,
      oncreate: update,
      onupdate: update,
      view: render,
      onremove: teardown
    };
  };
  const MithrilHooks = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null
  }, Symbol.toStringTag, { value: "Module" }));
  const ReactTypes = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null
  }, Symbol.toStringTag, { value: "Module" }));
  exports2.MithrilHooks = MithrilHooks;
  exports2.ReactTypes = ReactTypes;
  exports2.useCallback = useCallback;
  exports2.useEffect = useEffect;
  exports2.useLayoutEffect = useLayoutEffect;
  exports2.useMemo = useMemo;
  exports2.useReducer = useReducer;
  exports2.useRef = useRef;
  exports2.useState = useState;
  exports2.withHooks = withHooks;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
//# sourceMappingURL=mithril-hooks.umd.js.map
