import "reflect-metadata";
import {ValueRecord} from "@alkemist/compare-engine";
import {BaseState} from "./state.base.js";

const selectMetadataKey = Symbol("Select");

/*export function Select<T extends ValueRecord>() {
    return function (target: StateSelect<T>, propertyKey: any) {
        console.log("[Select Decorator] Target", target);
        console.log("[Select Decorator] Property key", propertyKey);

        return Reflect.getMetadata(selectMetadataKey, target, propertyKey);
    };
}*/

export function Select<T extends ValueRecord>() {
    return function (target: BaseState, propertyKey: any, descriptor: PropertyDescriptor) {
        console.log("[Select Decorator] Target", target);
        console.log("[Select Decorator] Property key", propertyKey);
        console.log("[Select Decorator] Descriptor", descriptor);

        return Reflect.getMetadata(selectMetadataKey, target, propertyKey);
    };
}