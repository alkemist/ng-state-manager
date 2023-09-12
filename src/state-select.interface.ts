import {AnyValue, ValueRecord} from "@alkemist/compare-engine";

export type StateSelect<T extends ValueRecord> = (state: T) => AnyValue