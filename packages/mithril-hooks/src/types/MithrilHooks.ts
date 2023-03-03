import type { DependencyList } from './ReactTypes';

export type TearDownFn = () => void;
export type UpdateFn = () => void;
export type MemoFn<T> = () => T;
export type ValueFn<T> = (currentValue: T, index: number) => T;
export type ValueOrFn<T> = T | ValueFn<T>;
export type NewValueFn<T> = (value: ValueOrFn<T>, index: number) => T;
export type EffectReturnFn = () => unknown;
export type Reducer<T, A> = (state: T, action: A) => T;
export type State = {
  states: unknown[];
  statesIndex: number;
  depsIndex: number;
  depsStates: DependencyList[];
  setup: boolean;
  teardowns: Map<string | number, TearDownFn>;
  updates: UpdateFn[];
};

