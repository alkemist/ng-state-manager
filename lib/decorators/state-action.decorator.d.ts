import "reflect-metadata";
import { ValueRecord } from "@alkemist/smart-tools";
import { StateActionDefinition } from '../models/state-action-definition.interface.js';
export declare function Action<A extends Object, C extends Object, S extends ValueRecord, T>(action: StateActionDefinition<A, T>): MethodDecorator;
//# sourceMappingURL=state-action.decorator.d.ts.map