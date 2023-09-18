import {ValueRecord} from '@alkemist/compare-engine';
import {ActionFunction} from './state-action.type.js';

export class StateAction<S extends ValueRecord> {
    constructor(private actionName: string, private actionFunction: ActionFunction<S>, private actionLog?: string) {
    }

    toString() {
        return this.actionLog ?? this.actionName;
    }

    isEqual(actionFunction: ActionFunction<S>) {
        return this.actionFunction.name === actionFunction.name;
    }
}