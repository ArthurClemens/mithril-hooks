declare const UNDEFINED_VOID_ONLY: unique symbol;
type Destructor = () => void | {
    [UNDEFINED_VOID_ONLY]: never;
};
export type DependencyList = ReadonlyArray<unknown>;
export type EffectCallback = () => void | Destructor;
export {};
