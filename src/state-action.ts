import { ValueRecord } from '@alkemist/compare-engine';
import { ActionFunction } from './state-action.type.js';

export class StateAction<S extends ValueRecord> {
  constructor(private actionFunction: ActionFunction<S>, private log?: string) {
  }

  isEqual(actionFunction: ActionFunction<S>) {
    return this.actionFunction.name === actionFunction.name;
  }
}