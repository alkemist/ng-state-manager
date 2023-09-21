import "reflect-metadata";
import { ValueRecord } from '@alkemist/compare-engine';
import { signal, WritableSignal } from '@angular/core';
import { StateSelectFunction } from './state-select-function.type.js';
import { StatesMap } from './states-map.js';

export function Observe<S extends ValueRecord, T>(state: any, selectFunction: StateSelectFunction<S, T>) {
  return <PropertyDecorator>function (target: any, propertyKey: any) {
    let observer = signal<T | undefined>(undefined)

    Object.defineProperty(target, propertyKey, {
      get(): WritableSignal<T | undefined> {
        return observer;
      },
      set(newValue: WritableSignal<T | undefined>) {
        observer = newValue;
      }
    });

    StatesMap.registerObserver<S, T>(
      state.name,
      selectFunction.name,
      `${ target.constructor.name }.${ propertyKey }`,
      target[propertyKey] as WritableSignal<T>,
    );
  }
}