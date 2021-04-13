import m, { Vnode, VnodeDOM, Component, Children } from 'mithril';
import { DependencyList, EffectCallback } from 'react';
import { MithrilHooks } from '..';
import { stringify } from 'flatted';

let currentState: MithrilHooks.State;

const call = Function.prototype.call.bind(Function.prototype.call);

const scheduleRender = () =>
  // Call m within the function body so environments with a global instance of m (like flems.io) don't complain
  m.redraw();

const updateDeps = (deps?: DependencyList) => {
  const state = currentState;
  const depsIndex = state.depsIndex++;
  const prevDeps = state.depsStates[depsIndex] || [];
  const shouldRecompute =
    deps === undefined
      ? true // Always compute
      : Array.isArray(deps)
      ? deps.length > 0
        ? !deps.every((x, i) => x === prevDeps[i]) // Only compute when one of the deps has changed
        : !state.setup // Empty array: only compute at mount
      : false; // Invalid value, do nothing
  if (deps !== undefined) {
    state.depsStates[depsIndex] = deps;
  }
  return shouldRecompute;
};

const effect = (isAsync = false) => (
  fn: EffectCallback,
  deps?: DependencyList,
) => {
  const state = currentState;
  const shouldRecompute = updateDeps(deps);
  if (shouldRecompute) {
    const depsIndex = state.depsIndex;
    const runCallbackFn = () => {
      const teardown = fn();
      // A callback may return a function. If any, add it to the teardowns:
      if (typeof teardown === 'function') {
        // Store this this function to be called at cleanup and unmount
        state.teardowns.set(depsIndex, teardown as MithrilHooks.EffectReturnFn);
        // At unmount, call re-render at least once
        state.teardowns.set('_', scheduleRender);
      }
    };

    // First clean up any previous cleanup function
    const teardown = state.teardowns.get(depsIndex);
    try {
      if (typeof teardown === 'function') {
        teardown();
      }
    } finally {
      state.teardowns.delete(depsIndex);
    }

    state.updates.push(
      isAsync
        ? () =>
            new Promise(resolve => requestAnimationFrame(resolve)).then(
              runCallbackFn,
            )
        : runCallbackFn,
    );
  }
};

const updateState = <T>(
  initialState?: T,
  newValueFn?: MithrilHooks.NewValueFn<T>,
): [T, (value: MithrilHooks.ValueOrFn<T>) => void, number] => {
  const state = currentState;
  const index = state.statesIndex++;
  if (!state.setup) {
    state.states[index] = initialState;
  }
  return [
    state.states[index] as T,
    (value: MithrilHooks.ValueOrFn<T>) => {
      const previousValue = state.states[index];
      const newValue = newValueFn ? newValueFn(value as T, index) : value;
      state.states[index] = newValue;
      if (stringify(newValue) !== stringify(previousValue)) {
        scheduleRender(); // Calling redraw multiple times: Mithril will drop extraneous redraw calls, so performance should not be an issue
      }
    },
    index,
  ];
};

export const useState = <T>(
  initialState: T,
): [T, (value: MithrilHooks.ValueOrFn<T>) => void, number] => {
  const state = currentState;
  const newValueFn = (value: MithrilHooks.ValueOrFn<T>, index: number) =>
    typeof value === 'function'
      ? (value as MithrilHooks.ValueFn<T>)(state.states[index] as T, index)
      : value;
  return updateState<T>(initialState, newValueFn);
};

export const useEffect = effect(true);
export const useLayoutEffect = effect();

export const useReducer = <T, A = void>(
  reducer: MithrilHooks.Reducer<T, A>,
  initialState?: T,
  initFn?: (args?: T) => T,
): [T, (action: A) => void] => {
  const state = currentState;
  // From the React docs: You can also create the initial state lazily. To do this, you can pass an init function as the third argument. The initial state will be set to init(initialValue).
  const initValue =
    !state.setup && initFn ? initFn(initialState) : initialState;

  const getValueDispatch = (): [T, (action: A) => void] => {
    const [value, setValue, index] = updateState(initValue);
    const dispatch = (action: A) => {
      const previousValue = state.states[index] as T;
      return setValue(
        // Next state:
        reducer(previousValue, action),
      );
    };
    return [value, dispatch];
  };

  return getValueDispatch();
};

export const useRef = <T>(initialValue: T) => {
  // A ref is a persisted object that will not be updated, so it has no setter
  const [value] = updateState<{ current: T }>({ current: initialValue });
  return value;
};

export const useMemo = <T>(
  fn: MithrilHooks.MemoFn<T>,
  deps?: DependencyList,
) => {
  const state = currentState;
  const shouldRecompute = updateDeps(deps);
  const [memoized, setMemoized] = !state.setup
    ? updateState<T>(fn())
    : updateState<T>();
  if (state.setup && shouldRecompute) {
    setMemoized(fn());
  }
  return memoized;
};

export const useCallback = <T extends (...args: any[]) => any>(
  callback: MithrilHooks.MemoFn<T>,
  deps?: DependencyList,
) => useMemo(() => callback, deps);

export const withHooks = <T>(
  renderFunction: (
    attrs: T & { vnode: Vnode<T, MithrilHooks.State>; children: Children },
  ) => Vnode<T>,
  initialAttrs?: T,
): Component<T> => {
  const init = (vnode: Vnode<T, MithrilHooks.State>) => {
    Object.assign(vnode.state, {
      setup: false,
      states: [],
      statesIndex: 0,
      depsStates: [],
      depsIndex: 0,
      updates: [],
      cleanups: new Map(),
      teardowns: new Map(), // Keep track of teardowns even when the update was run only once
    });
  };

  const update = (vnode: VnodeDOM<T, MithrilHooks.State>) => {
    const prevState = currentState;
    currentState = vnode.state;
    try {
      vnode.state.updates.forEach(call);
    } finally {
      Object.assign(vnode.state, {
        setup: true,
        updates: [],
        depsIndex: 0,
        statesIndex: 0,
      });
      currentState = prevState;
    }
  };

  const render = (vnode: Vnode<T, MithrilHooks.State>) => {
    const prevState = currentState;
    currentState = vnode.state;
    try {
      return renderFunction({
        ...initialAttrs,
        ...vnode.attrs,
        vnode,
        children: vnode.children,
      });
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    } finally {
      currentState = prevState;
    }
  };

  const teardown = (vnode: VnodeDOM<T, MithrilHooks.State>) => {
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
    onremove: teardown,
  };
};
