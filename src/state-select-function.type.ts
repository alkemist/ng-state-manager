import { AnyValue, ValueRecord } from '@alkemist/compare-engine';

export type StateSelectFunction<S extends ValueRecord = any, T = AnyValue>
  = (state: S) => T;