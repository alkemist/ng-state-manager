import { ValueRecord } from '@alkemist/compare-engine'
import { ValueKey } from '@alkemist/compare-engine/lib/value.type.js';

export interface StateInterface<S extends ValueRecord> {
  name: string,
  defaults: S,
  determineArrayIndexFn?: ((paths: ValueKey[]) => ValueKey) | undefined
}