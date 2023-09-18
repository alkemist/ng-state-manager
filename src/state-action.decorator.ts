import "reflect-metadata";
import {ValueRecord} from "@alkemist/compare-engine";
import {StateManager} from "./state-manager.js";
import {Type} from '@angular/core';

const stateMetadataKey = Symbol("Action");

export function Action<S extends ValueRecord>(logText?: string) {
    return function (target: Type<any>, propertyKey: any, descriptor: PropertyDescriptor) {
        StateManager.registerAction<S>(target.name, propertyKey, descriptor.value, logText);

        return Reflect.getMetadata(stateMetadataKey, target, propertyKey);
    };
}