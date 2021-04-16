import m, { Vnode, Children, Component } from 'mithril';
import type { MithrilHooks, ReactTypes } from './types';
export declare const useState: <T = unknown>(initialState?: T | undefined) => [T, (value: MithrilHooks.ValueOrFn<T>) => unknown, number];
export declare const useEffect: (fn: ReactTypes.EffectCallback, deps?: ReactTypes.DependencyList | undefined) => void;
export declare const useLayoutEffect: (fn: ReactTypes.EffectCallback, deps?: ReactTypes.DependencyList | undefined) => void;
export declare function useReducer<T, A = unknown, U = unknown>(reducer: MithrilHooks.Reducer<T, A>, initialState: U, initFn: (args?: U) => T): [T, (action: A) => unknown];
export declare function useReducer<T, A = unknown, U = unknown>(reducer: MithrilHooks.Reducer<T, A>, initialState?: T, initFn?: never): [T, (action: A) => unknown];
export declare const useRef: <T = unknown>(initialValue?: T | undefined) => {
    current: T | undefined;
};
export declare const useMemo: <T = unknown>(fn: MithrilHooks.MemoFn<T>, deps?: ReactTypes.DependencyList | undefined) => T;
export declare const useCallback: <T extends (...args: any[]) => any>(callback: T, deps?: ReactTypes.DependencyList | undefined) => T;
export declare const withHooks: <T = unknown>(renderFunction: (attrs: T & {
    vnode: m.Vnode<T, MithrilHooks.State>;
    children: Children;
}) => Children, initialAttrs?: T | undefined) => m.Component<T, MithrilHooks.State>;
