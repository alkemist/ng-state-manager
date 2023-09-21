import "reflect-metadata";
import { ValueKey, ValueRecord } from "@alkemist/compare-engine";
import { Type } from '@angular/core';
import { StatesMap } from './states-map.js';
import { StateSelectFunction } from './state-select-function.type.js';

const selectMetadataKey = Symbol("Select");

export function Select<S extends ValueRecord, T>(pathForCheckUpdated?: ValueKey | ValueKey[]) {
  return <MethodDecorator>function (target: Type<any>, propertyKey: any, descriptor: PropertyDescriptor) {
    StatesMap.registerSelect<S, T>(
      target.name,
      propertyKey,
      descriptor.value as StateSelectFunction<S, T>,
      pathForCheckUpdated
    );

    return Reflect.getMetadata(selectMetadataKey, target, propertyKey);
  };
}