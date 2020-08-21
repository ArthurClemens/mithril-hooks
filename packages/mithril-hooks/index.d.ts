import { Component, Vnode, Children } from 'mithril';
import { DependencyList, EffectCallback } from 'react';

export const withHooks: <T>(
  renderFunction: (
    attrs: T & { vnode: Vnode<T, MithrilHooks.State>; children: Children },
  ) => Vnode<T, MithrilHooks.State> | Children,
  initialAttrs?: T,
) => Component<T, MithrilHooks.State>;

export const useState: <T>(
  initialValue?: T,
) => [T, (value: MithrilHooks.ValueOrFn<T>) => void];

export const useEffect: (
  fn: EffectCallback,
  deps?: DependencyList,
) => void;

export const useLayoutEffect: (
  fn: EffectCallback,
  deps?: DependencyList,
) => void;

export const useReducer: <T, A = void>(
  reducer: MithrilHooks.Reducer<T, A>,
  initialValue?: T | U,
  initFn?: (args: U) => T,
) => [T, (action: A) => void];

export const useRef: <T>(
  initialValue?: T,
) => {
  current: T;
};

export const useMemo: <T>(
  fn: MithrilHooks.MemoFn<T>,
  deps?: DependencyList,
) => T;

export const useCallback: <T>(
  fn: MithrilHooks.MemoFn<T>,
  deps?: DependencyList,
) => MithrilHooks.MemoFn<T>;

export namespace MithrilHooks {
  type TearDownFn = () => void;
  type UpdateFn = () => void;
  type MemoFn<T> = () => T;
  type ValueFn<T> = (currentValue: T, index: number) => T;
  type ValueOrFn<T> = T | ValueFn<T>;
  type NewValueFn<T> = (value: ValueOrFn<T>, index: number) => T;
  type EffectReturnFn = () => unknown;
  type Reducer<T, A> = (state: T, action: A) => T;

  type State = {
    states: unknown[];
    statesIndex: number;
    depsIndex: number;
    depsStates: Deps[];
    setup: boolean;
    teardowns: Map<string | number, TearDownFn>;
    updates: UpdateFn[];
  };
}
