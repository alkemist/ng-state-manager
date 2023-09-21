import "reflect-metadata";
import { ValueKey, ValueRecord } from "@alkemist/compare-engine";
import { Type } from '@angular/core';
import { StatesMap } from './states-map.js';
import { StateSelectFunction } from './state-select-function.type.js';

export function Select<C extends Type<Object>, S extends ValueRecord, T>(pathForCheckUpdated?: ValueKey | ValueKey[]) {
    return <MethodDecorator>function (
        target: C,
        propertyKey: string,
        descriptor: TypedPropertyDescriptor<StateSelectFunction<S, T>>
    ) {
        StatesMap.registerSelect<C, S, T>(
            target.name,
            propertyKey,
            descriptor.value!,
            pathForCheckUpdated
        );

        return Reflect.getMetadata(Symbol("Select"), target, propertyKey);
    };
}