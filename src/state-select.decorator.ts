import "reflect-metadata";
import {ValueKey} from "@alkemist/compare-engine";
import {StateManager} from "./state-manager.js";
import {Type} from '@angular/core';

const selectMetadataKey = Symbol("Select");

export function Select(pathForCheckUpdated?: ValueKey | ValueKey[]) {
    return function (target: Type<any>, propertyKey: any, descriptor: PropertyDescriptor) {
        StateManager.registerSelect(target.name, propertyKey, descriptor.value, pathForCheckUpdated);

        return Reflect.getMetadata(selectMetadataKey, target, propertyKey);
    };
}