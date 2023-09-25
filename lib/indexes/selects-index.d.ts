import { ValueKey, ValueRecord } from "@alkemist/smart-tools";
import { StateConfiguration } from "../models/state-configuration.interface.js";
import { StateSelectFunction } from "../models/state-select-function.type.js";
import { StateActionFunction } from "../models/state-action-function.type.js";
import { WritableSignal } from "@angular/core";
export declare class SelectsIndex<C extends Object = Object, S extends ValueRecord = any> {
    private selects;
    private configuration;
    private state;
    private stateKey;
    initContext(configuration: StateConfiguration<C, S>): void;
    getState(): S;
    setSelect<T>(selectKey: string, selectFunction: StateSelectFunction<S, T>, path?: ValueKey | ValueKey[]): void;
    setObserver(selectKey: string, observerKey: string, observer: WritableSignal<any>): void;
    select<T>(selectKey: string): T;
    apply<T>(actionKey: string, actionFunction: StateActionFunction<S, T>, payload: T): void;
    update(): void;
}
//# sourceMappingURL=selects-index.d.ts.map