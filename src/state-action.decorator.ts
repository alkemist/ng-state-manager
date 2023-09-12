import "reflect-metadata";
import {ValueRecord} from "@alkemist/compare-engine";
import {BaseState} from "./state.base.js";

const stateMetadataKey = Symbol("Action");

/*export function Action<T extends ValueRecord>() {
    return function (target: StateAction<T>, propertyKey: any) {
        console.log("[Action Decorator] Target", target);
        console.log("[Action Decorator] Property key", propertyKey);

        return Reflect.getMetadata(stateMetadataKey, target, propertyKey);
    };
}*/

export function Action<T extends ValueRecord>() {
    return function (target: BaseState, propertyKey: any, descriptor: PropertyDescriptor) {
        console.log("[Action Decorator] Target", target);
        console.log("[Action Decorator] Property key", propertyKey);
        console.log("[Action Decorator] Descriptor", descriptor);

        return Reflect.getMetadata(stateMetadataKey, target, propertyKey);
    };
}