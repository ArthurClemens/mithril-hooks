import m from 'mithril';

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

let currentState;
const call = Function.prototype.call.bind(Function.prototype.call);
const scheduleRender = m.redraw;

const updateDeps = deps => {
  const state = currentState;
  const index = state.depsIndex++;
  const prevDeps = state.depsStates[index] || [];
  const shouldRecompute = deps === undefined ? true // Always compute
  : Array.isArray(deps) ? deps.length > 0 ? !deps.every((x, i) => x === prevDeps[i]) // Only compute when one of the deps has changed
  : !state.setup // Empty array: only compute at mount
  : false; // Invalid value, do nothing

  state.depsStates[index] = deps;
  return shouldRecompute;
};

const effect = function effect() {
  let isAsync = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return (fn, deps) => {
    const state = currentState;
    const shouldRecompute = updateDeps(deps);

    if (shouldRecompute) {
      const runCallbackFn = () => {
        const teardown = fn(); // A callback may return a function. If any, add it to the teardowns:

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

const updateState = function updateState(initialValue) {
  let newValueFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : value => value;
  const state = currentState;
  const index = state.statesIndex++;

  if (!state.setup) {
    state.states[index] = initialValue;
  }

  return [state.states[index], value => {
    const previousValue = state.states[index];
    const newValue = newValueFn(value, index);
    state.states[index] = newValue;

    if (newValue !== previousValue) {
      scheduleRender(); // Calling redraw multiple times: Mithril will drop extraneous redraw calls, so performance should not be an issue
    }
  }];
};

const useState = initialValue => {
  const state = currentState;

  const newValueFn = (value, index) => typeof value === "function" ? value(state.states[index]) : value;

  return updateState(initialValue, newValueFn);
};
const useEffect = effect(true);
const useLayoutEffect = effect();
const useReducer = (reducer, initialArg, initFn) => {
  const state = currentState; // From the React docs: You can also create the initial state lazily. To do this, you can pass an init function as the third argument. The initial state will be set to init(initialArg).

  const initialState = !state.setup && initFn ? initFn(initialArg) : initialArg;

  const _updateState = updateState(initialState),
        _updateState2 = _slicedToArray(_updateState, 2),
        value = _updateState2[0],
        setValue = _updateState2[1];

  const dispatch = action => setValue( // Next state:
  reducer(value, action));

  return [value, dispatch];
};
const useRef = initialValue => {
  // A ref is a persisted object that will not be updated, so it has no setter
  const _updateState3 = updateState({
    current: initialValue
  }),
        _updateState4 = _slicedToArray(_updateState3, 1),
        value = _updateState4[0];

  return value;
};
const useMemo = (fn, deps) => {
  const state = currentState;
  const shouldRecompute = updateDeps(deps);

  const _ref = !state.setup ? updateState(fn()) : updateState(),
        _ref2 = _slicedToArray(_ref, 2),
        memoized = _ref2[0],
        setMemoized = _ref2[1];

  if (state.setup && shouldRecompute) {
    setMemoized(fn());
  }

  return memoized;
};
const useCallback = (fn, deps) => useMemo(() => fn, deps);
const withHooks = component => {
  const state = {
    hooks: [],
    setup: false,
    states: [],
    statesIndex: 0,
    depsStates: [],
    depsIndex: 0,
    updates: [],
    teardowns: new Map() // Keep track of teardowns even when the update was run only once

  };

  const update = () => {
    const prevState = currentState;
    currentState = state;

    try {
      state.updates.forEach(call);
    } finally {
      Object.assign(state, {
        setup: true,
        updates: [],
        depsIndex: 0,
        statesIndex: 0
      });
      currentState = prevState;
    }
  };

  const render = vnode => {
    const prevState = currentState;
    currentState = state;

    try {
      return component(vnode.attrs);
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    } finally {
      currentState = prevState;
    }
  };

  const teardown = () => {
    const prevState = currentState;
    currentState = state;

    try {
      [...state.teardowns.values()].forEach(call);
    } finally {
      currentState = prevState;
    }
  };

  return {
    onupdate: update,
    view: render,
    onremove: teardown
  };
};

export { useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState, withHooks };
