declare const UNDEFINED_VOID_ONLY: unique symbol;
export type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };
export type EffectCallback = () => void | Destructor;
export type DependencyList = ReadonlyArray<unknown>;
