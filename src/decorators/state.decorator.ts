import "reflect-metadata";
import { StateConfiguration } from "../models/state-configuration.interface.js";
import { ValueRecord } from "@alkemist/compare-engine";
import { Type } from "@angular/core";
import { StatesMap } from '../indexes/states-map.js';

export function State<C extends Object, S extends ValueRecord>(configuration: StateConfiguration<C, S>) {
  return <ClassDecorator>function (target: Type<C>) {
    StatesMap.registerState<C, S>(configuration.name, configuration);

    return Reflect.getMetadata(Symbol("State"), target);
  };
}