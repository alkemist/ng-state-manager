import "reflect-metadata";
import { ValueRecord } from '@alkemist/compare-engine';
import { signal, Type } from '@angular/core';
import { ExampleComponent } from '../test/test-data.js';
import { BaseState } from './state.base.js';
import { SelectFunction } from './state-select.type.js';
import { StateManager } from './state-manager.js';

const observeMetadataKey = Symbol("Observe");

export function Observe<S extends ValueRecord>(state: Type<BaseState>, selectFunction: SelectFunction<S>) {
  return function (target: ExampleComponent, propertyKey: any) {
    /*console.log("[Observe Decorator] Target", target as ExampleComponent);
    console.log("[Observe Decorator] Name", target.constructor.name);
    console.log("[Observe Decorator] Property key", propertyKey);
    console.log("[Observe Decorator] Property var", target[propertyKey as keyof ExampleComponent]);*/

    const observer = signal('')

    Object.defineProperty(target, propertyKey, observer);

    StateManager.registerObserver(
      state.name,
      selectFunction.name,
      observer//target[propertyKey as keyof ExampleComponent] as WritableSignal<any>,
    );

    return Reflect.getMetadata(observeMetadataKey, target, propertyKey)
  }
}

/*export function Observe<S extends ValueRecord, C extends BaseComponent>(state: Type<BaseState>, selectFunction: SelectFunction<S>) {
  return function (target: C, propertyKey: keyof BaseComponent) {
    /*console.log("[Observe Decorator] Target", target.constructor.name);
    console.log("[Observe Decorator] Property key", propertyKey);
    console.log("[Observe Decorator] Select function",
      selectFunction,
      selectFunction.name,
      selectFunction.toString(),
      Object.getPrototypeOf(selectFunction)
    );*//*

    StateManager.registerObserver(
      state.name,
      selectFunction.name,
      target[propertyKey] as WritableSignal<any>,
    );

    //return Reflect.getMetadata(observeMetadataKey, target, propertyKey) as typeof target;
  }
}*/