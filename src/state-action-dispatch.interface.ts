import { StateActionFunction } from './state-action-function.type.js';
import { ValueRecord } from '@alkemist/compare-engine';

export interface StateActionDispatch<S extends ValueRecord, T = any> {
  actionFunction: StateActionFunction<S, T>
  payload?: T
}