import "reflect-metadata";
import { StateInterface } from "./state.interface.js";
import { ValueRecord } from "@alkemist/compare-engine";
import { Type } from "@angular/core";
import { StatesMap } from './states-map.js';

const stateMetadataKey = Symbol("State");

export function State<T extends ValueRecord>(configuration: StateInterface<T>) {
  return <ClassDecorator>function (target: Type<any>) {
    StatesMap.registerState(target.name, configuration);

    return Reflect.getMetadata(stateMetadataKey, target);
  };
}