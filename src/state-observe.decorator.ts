import "reflect-metadata";
import { ValueRecord } from '@alkemist/compare-engine';
import { signal, Type, WritableSignal } from '@angular/core';
import { BaseState } from './state.base.js';
import { SelectFunction } from './state-select.type.js';
import { StateManager } from './state-manager.js';

const observeMetadataKey = Symbol("Observe");

export function Observe<S extends ValueRecord, T>(state: Type<BaseState>, selectFunction: SelectFunction<S, T>) {
  return function (target: any, propertyKey: any) {
    //console.log("[Observe Decorator] Target", target.constructor.name);
    //console.log("[Observe Decorator] Property key", propertyKey);

    let observer = signal<T | undefined>(undefined)

    Object.defineProperty(target, propertyKey, {
      get(): WritableSignal<T | undefined> {
        return observer;
      },
      set(newValue: WritableSignal<T | undefined>) {
        observer = newValue;
      }
    });

    StateManager.registerObserver(
      state.name,
      selectFunction.name,
      target[propertyKey] as WritableSignal<any>,
    );
  }
}