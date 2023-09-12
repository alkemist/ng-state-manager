import "reflect-metadata";
import {BaseComponent} from "./component.base.js";

const observeMetadataKey = Symbol("Observe");

export function Observe<T>() {
    return function (target: BaseComponent, propertyKey: any) {
        console.log("[Observe Decorator] Target", target);
        console.log("[Observe Decorator] Property key", propertyKey);

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