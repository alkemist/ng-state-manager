import "reflect-metadata";
import {ValueRecord} from '@alkemist/compare-engine';
import {signal, WritableSignal} from '@angular/core';
import {SelectFunction} from './state-select.type.js';
import {StateManager} from './state-manager.js';

export function Observe<S extends ValueRecord, T>(state: any, selectFunction: SelectFunction<S, T>) {
    return function (target: any, propertyKey: any) {
        let observer = signal<T | undefined>(undefined)

        Object.defineProperty(target, propertyKey, {
            get(): WritableSignal<T | undefined> {
                return observer;
            },
            set(newValue: WritableSignal<T | undefined>) {
                observer = newValue;
            }
        });

        StateManager.registerObserver<S, T>(
            state.name,
            selectFunction.name,
            `${target.constructor.name}.${propertyKey}`,
            target[propertyKey] as WritableSignal<any>,
        );
    }
}