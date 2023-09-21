import { ValueRecord } from '@alkemist/compare-engine'
import { ValueKey } from '@alkemist/compare-engine/lib/value.type.js';
import { Type } from '@angular/core';

export interface StateInterface<C extends Type<Object>, S extends ValueRecord> {
    class: C,
    defaults: S,
    determineArrayIndexFn?: ((paths: ValueKey[]) => ValueKey) | undefined,
    enableLocalStorage?: boolean,
    showLog?: boolean
}