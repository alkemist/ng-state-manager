import { ValueRecord } from '@alkemist/compare-engine';
import { StateActionFunction } from './state-action-function.type.js';

export interface StateActionIndex<S extends ValueRecord = any, T = any> {
    stateKey: string
    actionFunction: StateActionFunction<S, T>
}