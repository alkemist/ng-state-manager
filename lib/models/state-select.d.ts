import { StateSelectFunction } from './state-select-function.type.js';
import { ValueKey, ValueRecord } from '@alkemist/compare-engine';
import { WritableSignal } from "@angular/core";
export declare class StateSelect<S extends ValueRecord, T = any> {
    private selectFunction;
    private _path?;
    private observers;
    constructor(selectFunction: StateSelectFunction<S, T>, _path?: ValueKey | ValueKey[] | undefined);
    get path(): ValueKey | ValueKey[] | undefined;
    addObserver(observerKey: string, observer: WritableSignal<T>): this;
    getValue(state: S): T;
    update(state: S): void;
}
//# sourceMappingURL=state-select.d.ts.map