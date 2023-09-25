import { ValueRecord } from '@alkemist/smart-tools';
import { StateContext } from './state.context.js';
export type StateActionFunction<S extends ValueRecord = any, T = any> = (context: StateContext<S>, payload: T) => void;
//# sourceMappingURL=state-action-function.type.d.ts.map