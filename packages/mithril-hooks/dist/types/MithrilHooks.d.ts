import type { DependencyList } from './ReactTypes';
export declare type TearDownFn = () => void;
export declare type UpdateFn = () => void;
export declare type MemoFn<T> = () => T;
export declare type ValueFn<T> = (currentValue: T, index: number) => T;
export declare type ValueOrFn<T> = T | ValueFn<T>;
export declare type NewValueFn<T> = (value: ValueOrFn<T>, index: number) => T;
export declare type EffectReturnFn = () => unknown;
export declare type Reducer<T, A> = (state: T, action: A) => T;
export declare type State = {
    states: unknown[];
    statesIndex: number;
    depsIndex: number;
    depsStates: DependencyList[];
    setup: boolean;
    teardowns: Map<string | number, TearDownFn>;
    updates: UpdateFn[];
};
export {};
