import "reflect-metadata";
import {BaseComponent} from "./component.base.js";
import {SelectFunction} from "./metadata-decorator.interface.js";
import {ValueRecord} from "@alkemist/compare-engine";

const observeMetadataKey = Symbol("Observe");

export function Observe<T extends ValueRecord>(selectFunction: SelectFunction<T>) {
    return function (target: BaseComponent, propertyKey: any) {
        console.log("[Observe Decorator] Target", target.constructor.name);
        console.log("[Observe Decorator] Property key", propertyKey);
        console.log("[Observe Decorator] Select function", selectFunction);

        //StateManager.registerObserver()

        return Reflect.getMetadata(observeMetadataKey, target, propertyKey);

        /*let observer: Signal<T> | undefined = undefined
        const getter = function () {
            return observer;
        };
        const setter = function (value: T) {
            observer = signal<T>(value);
        };
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });*/
    }
}