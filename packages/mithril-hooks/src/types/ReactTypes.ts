declare const UNDEFINED_VOID_ONLY: unique symbol;
// Destructors are only allowed to return void.
type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };

export type DependencyList = ReadonlyArray<unknown>;
export type EffectCallback = () => void | Destructor;
