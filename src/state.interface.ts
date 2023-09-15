import { ValueRecord } from '@alkemist/compare-engine'

export interface StateInterface<S extends ValueRecord> {
  name: string,
  defaults: S
}