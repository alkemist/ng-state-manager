import { ValueRecord } from '@alkemist/smart-tools';
import { StateActionFunction } from './state-action-function.type.js';
export interface StateActionIndex<S extends ValueRecord = any, T = any> {
    stateKey: string;
    actionFunction: StateActionFunction<S, T>;
}
//# sourceMappingURL=state-action-index.interface.d.ts.map