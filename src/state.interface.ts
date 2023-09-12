import {ValueRecord} from '@alkemist/compare-engine'

export interface StateInterface<StateInterface extends ValueRecord> {
    name: string,
    defaults: StateInterface
}