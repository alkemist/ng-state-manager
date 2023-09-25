import "reflect-metadata";
import { ValueRecord } from '@alkemist/smart-tools';
import { Type } from '@angular/core';
import { StateSelectFunction } from '../models/state-select-function.type.js';
export declare function Observe<C extends Object, S extends ValueRecord, T>(state: Type<C>, selectFunction: StateSelectFunction<S, T>, ...paths: string[]): PropertyDecorator;
//# sourceMappingURL=state-observe.decorator.d.ts.map