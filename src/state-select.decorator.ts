import "reflect-metadata";
import { ValueKey, ValueRecord } from "@alkemist/compare-engine";
import { BaseState } from "./state.base.js";
import { StateManager } from "./state-manager.js";
import { Type } from '@angular/core';

const selectMetadataKey = Symbol("Select");

export function Select<T extends ValueRecord>(path?: ValueKey | ValueKey[]) {
  return function (target: Type<BaseState>, propertyKey: any, descriptor: PropertyDescriptor) {
    /*console.log("[Select Decorator] Target", target.name);
    console.log("[Select Decorator] Property key", propertyKey);
    console.log("[Select Decorator] Descriptor", descriptor);*/

    StateManager.registerSelect(target.name, target, propertyKey, descriptor.value, path);

    return Reflect.getMetadata(selectMetadataKey, target, propertyKey);
  };
}