import m from 'mithril';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var currentState;
var call = Function.prototype.call.bind(Function.prototype.call);

var scheduleRender = () => // Call m within the function body so environments with a global instance of m (like flems.io) don't complain
m.redraw();

var updateDeps = deps => {
  var state = currentState;
  var index = state.depsIndex++;
  var prevDeps = state.depsStates[index] || [];
  var shouldRecompute = deps === undefined ? true // Always compute
  : Array.isArray(deps) ? deps.length > 0 ? !deps.every((x, i) => x === prevDeps[i]) // Only compute when one of the deps has changed
  : !state.setup // Empty array: only compute at mount
  : false; // Invalid value, do nothing

  state.depsStates[index] = deps;
  return shouldRecompute;
};

var effect = function effect() {
  var isAsync = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return (fn, deps) => {
    var state = currentState;
    var shouldRecompute = updateDeps(deps);

    if (shouldRecompute) {
      var runCallbackFn = () => {
        var teardown = fn(); // A callback may return a function. If any, add it to the teardowns:

        if (typeof teardown === "function") {
          // Store this this function to be called at unmount
          state.teardowns.set(fn, teardown); // At unmount, call re-render at least once

          state.teardowns.set("_", scheduleRender);
        }
      };

      state.updates.push(isAsync ? () => new Promise(resolve => requestAnimationFrame(resolve)).then(runCallbackFn) : runCallbackFn);
    }
  };
};

var updateState = function updateState(initialValue) {
  var newValueFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : value => value;
  var state = currentState;
  var index = state.statesIndex++;

  if (!state.setup) {
    state.states[index] = initialValue;
  }

  return [state.states[index], value => {
    var previousValue = state.states[index];
    var newValue = newValueFn(value, index);
    state.states[index] = newValue;

    if (JSON.stringify(newValue) !== JSON.stringify(previousValue)) {
      scheduleRender(); // Calling redraw multiple times: Mithril will drop extraneous redraw calls, so performance should not be an issue
    }
  }, index];
};

var useState = initialValue => {
  var state = currentState;

  var newValueFn = (value, index) => typeof value === "function" ? value(state.states[index]) : value;

  return updateState(initialValue, newValueFn);
};
var useEffect = effect(true);
var useLayoutEffect = effect();
var useReducer = (reducer, initialArg, initFn) => {
  var state = currentState; // From the React docs: You can also create the initial state lazily. To do this, you can pass an init function as the third argument. The initial state will be set to init(initialArg).

  var initialValue = !state.setup && initFn ? initFn(initialArg) : initialArg;

  var getValueDispatch = () => {
    var [value, setValue, index] = updateState(initialValue);

    var dispatch = action => {
      var previousValue = state.states[index];
      return setValue( // Next state:
      reducer(previousValue, action));
    };

    return [value, dispatch];
  };

  return getValueDispatch();
};
var useRef = initialValue => {
  // A ref is a persisted object that will not be updated, so it has no setter
  var [value] = updateState({
    current: initialValue
  });
  return value;
};
var useMemo = (fn, deps) => {
  var state = currentState;
  var shouldRecompute = updateDeps(deps);
  var [memoized, setMemoized] = !state.setup ? updateState(fn()) : updateState();

  if (state.setup && shouldRecompute) {
    setMemoized(fn());
  }

  return memoized;
};
var useCallback = (fn, deps) => useMemo(() => fn, deps);
var withHooks = (component, initialProps) => {
  var init = vnode => {
    Object.assign(vnode.state, {
      setup: false,
      states: [],
      statesIndex: 0,
      depsStates: [],
      depsIndex: 0,
      updates: [],
      teardowns: new Map() // Keep track of teardowns even when the update was run only once

    });
  };

  var update = vnode => {
    var prevState = currentState;
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

  var render = vnode => {
    var prevState = currentState;
    currentState = vnode.state;

    try {
      return component(_objectSpread2({}, initialProps, {}, vnode.attrs, {
        vnode,
        children: vnode.children
      }));
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    } finally {
      currentState = prevState;
    }
  };

  var teardown = vnode => {
    var prevState = currentState;
    currentState = vnode.state;

    try {
      [...vnode.state.teardowns.values()].forEach(call);
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

export { useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState, withHooks };
