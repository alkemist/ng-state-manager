import { Type } from "@angular/core";
import { ValueRecord } from "@alkemist/compare-engine";
import { StateSelectFunction } from './models/state-select-function.type.js';
import { StateActionClass } from './models/state-action-class.interface.js';
export declare class StateManager {
    select<C extends Object, S extends ValueRecord, T>(stateClass: Type<C>, selectFunction: StateSelectFunction<S, T>): T;
    dispatch(actions: StateActionClass | StateActionClass[]): void;
}
//# sourceMappingURL=state-manager.service.d.ts.map