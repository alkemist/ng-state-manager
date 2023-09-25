import { CompareEngine, ValueRecord } from "@alkemist/compare-engine";
export declare class StateContext<S extends ValueRecord> {
    private state;
    constructor(state: CompareEngine<S>);
    getState(): S;
    setState(val: S): void;
    patchState(val: Partial<S>): void;
}
//# sourceMappingURL=state.context.d.ts.map