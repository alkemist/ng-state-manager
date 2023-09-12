import "reflect-metadata";
import {ValueRecord} from "@alkemist/compare-engine";
import {BaseState} from "./state.base.js";
import {StateManager} from "./state-manager.js";

const selectMetadataKey = Symbol("Select");

export function Select<T extends ValueRecord>() {
    return function (target: BaseState, propertyKey: any, descriptor: PropertyDescriptor) {
        console.log("[Select Decorator] Target", target.constructor.name);
        console.log("[Select Decorator] Property key", propertyKey);
        console.log("[Select Decorator] Descriptor", descriptor);

        StateManager.registerSelect(target.constructor.name, propertyKey, descriptor.value);

        return Reflect.getMetadata(selectMetadataKey, target, propertyKey);
    };
}