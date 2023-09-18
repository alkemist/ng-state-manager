import {ActionFunction} from './state-action.type.js';
import {ValueRecord} from '@alkemist/compare-engine';

export interface StateActionDispatch<S extends ValueRecord, T = any> {
    actionFunction: ActionFunction<S, T>
    payload?: T
}