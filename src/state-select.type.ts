import { AnyValue, ValueRecord } from '@alkemist/compare-engine';

export type SelectFunction<S extends ValueRecord = any, T = AnyValue>
  = (state: S) => T;