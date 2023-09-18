import "reflect-metadata";
import {StateInterface} from "./state.interface.js";
import {ValueRecord} from "@alkemist/compare-engine";
import {Type} from "@angular/core";
import {StateManager} from "./state-manager.js";

const stateMetadataKey = Symbol("State");

export function State<T extends ValueRecord>(configuration: StateInterface<T>) {
    return function (target: Type<any>) {
        StateManager.registerState(target.name, configuration);

        return Reflect.getMetadata(stateMetadataKey, target);
    };
}