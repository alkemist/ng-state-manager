import { AnyValue, ValueRecord } from '@alkemist/compare-engine';
import { StateContext } from './state.context.js';

export type ActionFunction<T extends ValueRecord = any>
  = (context: StateContext<T>, ...args: any) => AnyValue;