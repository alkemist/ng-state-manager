import "reflect-metadata";
import {BaseState} from "./state.base.js";
import {StateInterface} from "./state.interface.js";
import {ValueRecord} from "@alkemist/compare-engine";
import {Type} from "@angular/core";
import {StateManager} from "./state-manager.js";

const stateMetadataKey = Symbol("State");

export function State<T extends ValueRecord>(configuration: StateInterface<T>) {
    return function (target: Type<BaseState>) {
        console.log("[State Decorator] Target", target.constructor.name);
        console.log("[State Decorator] Config", configuration);

        StateManager.registerState(target.constructor.name, configuration);

        return Reflect.getMetadata(stateMetadataKey, target);
    };
}