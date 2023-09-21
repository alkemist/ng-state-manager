import "reflect-metadata";
import { ValueRecord } from '@alkemist/compare-engine';
import { signal, Type, WritableSignal } from '@angular/core';
import { StateSelectFunction } from './state-select-function.type.js';
import { StatesMap } from './states-map.js';

export function Observe<C extends Type<Object>, S extends ValueRecord, T>(state: C, selectFunction: StateSelectFunction<S, T>) {
    return <PropertyDecorator>function (target: Object, propertyKey: keyof Object) {
        let observer = signal<T | undefined>(undefined)

        Object.defineProperty(target, propertyKey,
            {
                value: observer,
                writable: false,
            }
        );

        StatesMap.registerObserver<C, S, T>(
            state.name,
            selectFunction.name,
            `${ target.constructor.name }.${ propertyKey }`,
            <WritableSignal<T>>target[propertyKey],
        );
    }
}