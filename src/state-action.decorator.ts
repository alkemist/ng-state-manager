import "reflect-metadata";
import { ValueRecord } from "@alkemist/compare-engine";
import { BaseState } from "./state.base.js";
import { StateManager } from "./state-manager.js";
import { Type } from '@angular/core';

const stateMetadataKey = Symbol("Action");

export function Action<T extends ValueRecord>() {
  return function (target: Type<BaseState>, propertyKey: any, descriptor: PropertyDescriptor) {
    /*console.log("[Action Decorator] Target", target.name);
    console.log("[Action Decorator] Property key", propertyKey);
    console.log("[Action Decorator] Descriptor", descriptor);*/

    StateManager.registerAction(target.name, target, propertyKey, descriptor.value);

    return Reflect.getMetadata(stateMetadataKey, target, propertyKey);
  };
}