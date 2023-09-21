import "reflect-metadata";
import { ValueRecord } from "@alkemist/compare-engine";
import { Type } from '@angular/core';
import { StatesMap } from './states-map.js';
import { StateActionFunction } from './state-action-function.type.js';

export function Action<C extends Type<C>, S extends ValueRecord, T>(logText?: string) {
    return <MethodDecorator>function (
        target: C,
        propertyKey: string,
        descriptor: TypedPropertyDescriptor<StateActionFunction<S, T>>
    ) {
        StatesMap.registerAction<C, S, T>(
            target.name,
            propertyKey,
            descriptor.value!,
            logText
        );

        return Reflect.getMetadata(Symbol("Action"), target, propertyKey);
    };
}