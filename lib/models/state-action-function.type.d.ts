import { ValueRecord } from '@alkemist/compare-engine';
import { StateContext } from './state.context.js';
export type StateActionFunction<S extends ValueRecord = any, T = any> = (context: StateContext<S>, payload: T) => void;
//# sourceMappingURL=state-action-function.type.d.ts.map