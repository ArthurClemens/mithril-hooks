declare const UNDEFINED_VOID_ONLY: unique symbol;
export declare type Destructor = () => void | {
    [UNDEFINED_VOID_ONLY]: never;
};
export declare type EffectCallback = () => void | Destructor;
export declare type DependencyList = ReadonlyArray<unknown>;
export {};
