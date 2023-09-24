import "reflect-metadata";
import { ValueRecord } from "@alkemist/compare-engine";
import { StateActionFunction } from '../models/state-action-function.type.js';
import { StatesMap } from '../indexes/states-map.js';
import { StateActionDefinition } from '../models/state-action-definition.interface.js';

export function Action<A extends Object, C extends Object, S extends ValueRecord, T>(
    action: StateActionDefinition<A, T>,
): MethodDecorator {
    return <MethodDecorator>function (
        target: C,
        propertyKey: string,
        descriptor: TypedPropertyDescriptor<StateActionFunction<S, T>>
    ) {
        StatesMap.registerAction<A, S, T>(
            target.constructor.name,
            action,
            descriptor.value!,
        );

        return Reflect.getMetadata(Symbol("Action"), target, propertyKey);
    };
}