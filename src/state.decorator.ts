import "reflect-metadata";
import { StateInterface } from "./state.interface.js";
import { ValueRecord } from "@alkemist/compare-engine";
import { Type } from "@angular/core";
import { StatesMap } from './states-map.js';

export function State<C extends Type<Object>, S extends ValueRecord>(configuration: StateInterface<C, S>) {
    return <ClassDecorator>function (target: C) {
        StatesMap.registerState<C, S>(target.name, configuration);

        return Reflect.getMetadata(Symbol("State"), target);
    };
}