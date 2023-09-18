import {ValueRecord} from '@alkemist/compare-engine';
import {StateContext} from './state.context.js';

export type ActionFunction<S extends ValueRecord = any, T = any>
    = (context: StateContext<S>, payload?: T) => void;