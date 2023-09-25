import { StateActionClass } from './state-action-class.interface.js';
export interface StateActionDefinition<A extends Object = Object, T = any> {
    log: string;
    new (payload: T): StateActionClass<T>;
}
//# sourceMappingURL=state-action-definition.interface.d.ts.map