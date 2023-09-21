import "reflect-metadata";
import { ValueRecord } from "@alkemist/compare-engine";
import { Type } from '@angular/core';
import { StatesMap } from './states-map.js';
import { StateActionFunction } from './state-action-function.type.js';

const stateMetadataKey = Symbol("Action");

export function Action<S extends ValueRecord, T>(logText?: string) {
  return <MethodDecorator>function (target: Type<any>, propertyKey: any, descriptor: PropertyDescriptor) {
    StatesMap.registerAction<S, T>(
      target.name,
      propertyKey,
      descriptor.value as StateActionFunction<S, T>,
      logText
    );

    return Reflect.getMetadata(stateMetadataKey, target, propertyKey);
  };
}