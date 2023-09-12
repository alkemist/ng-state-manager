import "reflect-metadata";
import {BaseState} from "./state.base.js";
import {StateInterface} from "./state.interface.js";
import {ValueRecord} from "@alkemist/compare-engine";
import {Type} from "@angular/core";

const stateMetadataKey = Symbol("State");

/*export function State<T extends ValueRecord>(configuration: StateInterface<T>) {
    return function (target: Type<BaseState>, propertyKey: any) {
        console.log("[State Decorator] Target", target);
        console.log("[State Decorator] Property key", propertyKey);
        console.log("[State Decorator] Config", configuration);

        return Reflect.getMetadata(stateMetadataKey, target, propertyKey);
    };
}*/

export function State<T extends ValueRecord>(configuration: StateInterface<T>) {
    return function (target: Type<BaseState>) {
        console.log("[State Decorator] Target", target);
        console.log("[State Decorator] Config", configuration);

        return Reflect.getMetadata(stateMetadataKey, target);
    };
}