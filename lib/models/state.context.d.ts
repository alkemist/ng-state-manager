import { ValueKey, ValueRecord } from "@alkemist/smart-tools";
import { CompareEngine } from '@alkemist/compare-engine';
export declare class StateContext<S extends ValueRecord> {
    private state;
    constructor(state: CompareEngine<S>);
    getState(): S;
    setState(val: S): void;
    setInState(paths: ValueKey[] | ValueKey, val: unknown): void;
    patchState(val: Partial<S>): void;
    patchInState<T>(paths: ValueKey[] | ValueKey, val: T): void;
    addItem<T>(paths: ValueKey[] | ValueKey, item: T): T[];
    addItems<T>(paths: ValueKey[] | ValueKey, items: T[]): T[];
    setItem<T>(paths: ValueKey[] | ValueKey, selector: (item: T) => boolean, item: T): T[];
    patchItem<T>(paths: ValueKey[] | ValueKey, selector: (item: T) => boolean, item: Partial<T>): T[];
    removeItem<T>(paths: ValueKey[] | ValueKey, selector: (item: T) => boolean): T[];
    private getItems;
    private setItems;
}
//# sourceMappingURL=state.context.d.ts.map