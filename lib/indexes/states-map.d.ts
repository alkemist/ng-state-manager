import { ValueKey, ValueRecord } from '@alkemist/smart-tools';
import { StateConfiguration } from '../models/state-configuration.interface.js';
import { StateSelectFunction } from '../models/state-select-function.type.js';
import { StateActionFunction } from '../models/state-action-function.type.js';
import { WritableSignal } from '@angular/core';
import { SelectsIndex } from "./selects-index.js";
import { StateActionDefinition } from '../models/state-action-definition.interface.js';
import { StateActionClass } from '../models/state-action-class.interface.js';
export declare abstract class StatesMap {
    private static selectsByState;
    private static actionIndex;
    static registerSelect<C extends Object, S extends ValueRecord, T>(stateKey: string, selectKey: string, selectFunction: StateSelectFunction<S, T>, path?: ValueKey | ValueKey[]): void;
    static registerAction<A extends Object, S extends ValueRecord, T>(stateKey: string, action: StateActionDefinition<A, T>, actionFunction: StateActionFunction<S, T>): void;
    static registerObserver<C extends Object, S extends ValueRecord, T>(stateKey: string, selectKey: string, observerKey: string, observer: WritableSignal<T>): void;
    static registerState<C extends Object, S extends ValueRecord>(stateKey: string, configuration: StateConfiguration<C, S>): void;
    static getSelectsIndex<C extends Object, S extends ValueRecord>(stateKey: string): SelectsIndex<C, S>;
    static dispatch(actions: StateActionClass[]): void;
    private static hasState;
    private static getOrCreate;
}
//# sourceMappingURL=states-map.d.ts.map