import {ValueRecord} from '@alkemist/compare-engine';
import {ActionFunction} from './state-action.type.js';

export class StateAction<S extends ValueRecord, T = any> {
    constructor(private actionName: string, private actionFunction: ActionFunction<S, T>, private actionLog?: string) {
    }

    toString() {
        return this.actionLog ?? this.actionName;
    }

    isEqual(actionFunction: ActionFunction<S, T>) {
        return this.actionFunction.name === actionFunction.name;
    }
}