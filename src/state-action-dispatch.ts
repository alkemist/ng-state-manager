import {ActionFunction} from './state-action.type.js';
import {ValueRecord} from '@alkemist/compare-engine';

export class StateActionDispatch<S extends ValueRecord = any> {
    public readonly args: any[];

    constructor(
        public actionFunction: ActionFunction<S>,
        ...args: any[]
    ) {
        this.args = args;
    }
}