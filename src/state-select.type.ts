import { AnyValue, ValueRecord } from '@alkemist/compare-engine';

export type SelectFunction<T extends ValueRecord = any>
  = (state: T) => AnyValue;