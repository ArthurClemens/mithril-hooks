import m from "mithril";

let currentState;

const call = Function.prototype.call.bind(
  Function.prototype.call
);

const scheduleRender = () =>
  // Call m within the function body so environments with a global instance of m (like flems.io) don't complain
  m.redraw();

const updateDeps = deps => {
  const state = currentState;
  const index = state.depsIndex++;
  const prevDeps = state.depsStates[index] || [];
  const shouldRecompute = deps === undefined
    ? true // Always compute
    : Array.isArray(deps)
      ? deps.length > 0
        ? !deps.every((x,i) => x === prevDeps[i]) // Only compute when one of the deps has changed
        : !state.setup // Empty array: only compute at mount
      : false; // Invalid value, do nothing
  state.depsStates[index] = deps;
  return shouldRecompute;
};

const effect = (isAsync = false) => (fn, deps) => {
  const state = currentState;
  const shouldRecompute = updateDeps(deps);
  if (shouldRecompute) {
    const runCallbackFn = () => {
      const teardown = fn();
      // A callback may return a function. If any, add it to the teardowns:
      if (typeof teardown === "function") {
        // Store this this function to be called at unmount
        state.teardowns.set(fn, teardown);
        // At unmount, call re-render at least once
        state.teardowns.set("_", scheduleRender);
      }
    };
    state.updates.push(
      isAsync
        ? () => new Promise(resolve => requestAnimationFrame(resolve)).then(runCallbackFn)
        : runCallbackFn
    );
  }
};

const updateState = (initialValue, newValueFn = value => value) => {
  const state = currentState;
  const index = state.statesIndex++;
  if (!state.setup) {
    state.states[index] = initialValue;
  }
  return [
    state.states[index],
    value => {
      const previousValue = state.states[index];
      const newValue = newValueFn(value, index);
      state.states[index] = newValue;
      if (JSON.stringify(newValue) !== JSON.stringify(previousValue)) {
        scheduleRender(); // Calling redraw multiple times: Mithril will drop extraneous redraw calls, so performance should not be an issue
      }
    },
    index
  ];
};

export const useState = initialValue => {
  const state = currentState;
  const newValueFn = (value, index) =>
    typeof value === "function"
      ? value(state.states[index])
      : value;
  return updateState(initialValue, newValueFn);
};

export const useEffect = effect(true);
export const useLayoutEffect = effect();

export const useReducer = (reducer, initialArg, initFn) => {
  const state = currentState;
  // From the React docs: You can also create the initial state lazily. To do this, you can pass an init function as the third argument. The initial state will be set to init(initialArg).
  const initialValue = !state.setup && initFn
    ? initFn(initialArg)
    : initialArg;

  const getValueDispatch = () => {
    const [value, setValue, index] = updateState(initialValue);
    const dispatch = action => {
      const previousValue = state.states[index];
      return setValue( // Next state:
        reducer(previousValue, action)
      );
    };
    return [value, dispatch];
  };
  
  return getValueDispatch();
};
  
export const useRef = initialValue => {
  // A ref is a persisted object that will not be updated, so it has no setter
  const [value] = updateState({ current: initialValue });
  return value;
};
  
export const useMemo = (fn, deps) => {
  const state = currentState;
  const shouldRecompute = updateDeps(deps);
  const [memoized, setMemoized] = !state.setup
    ? updateState(fn())
    : updateState();
  if (state.setup && shouldRecompute) {
    setMemoized(fn());
  }
  return memoized;
};
  
export const useCallback = (fn, deps) =>
  useMemo(() => fn, deps);
    
export const withHooks = (component, initialProps) => {

  const init = vnode => {
    Object.assign(vnode.state, {
      setup: false,
      states: [],
      statesIndex: 0,
      depsStates: [],
      depsIndex: 0,
      updates: [],
      teardowns: new Map // Keep track of teardowns even when the update was run only once
    });
  };
  
  const update = vnode => {
    const prevState = currentState;
    currentState = vnode.state;
    try {
      vnode.state.updates.forEach(call);
    }
    finally {
      Object.assign(vnode.state, {
        setup: true,
        updates: [],
        depsIndex: 0,
        statesIndex: 0,
      });
      currentState = prevState;
    }
  };
  
  const render = vnode => {
    const prevState = currentState;
    currentState = vnode.state;
    try {
      return component({
        ...initialProps,
        ...vnode.attrs,
        vnode,
        children: vnode.children,
      });
    }
    catch (e) {
      console.error(e); // eslint-disable-line no-console
    }
    finally {
      currentState = prevState;
    }
  };
  
  const teardown = vnode => {
    const prevState = currentState;
    currentState = vnode.state;
    try {
      [...vnode.state.teardowns.values()].forEach(call);
    }
    finally {
      currentState = prevState;
    }
  };
      
  return {
    oninit: init,
    oncreate: update,
    onupdate: update,
    view: render,
    onremove: teardown,
  };
};
