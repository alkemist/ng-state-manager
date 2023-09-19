import { ValueRecord } from '@alkemist/compare-engine';
import { StateActionFunction } from './state-action-function.type.js';

export class StateAction<S extends ValueRecord, T = any> {
  constructor(private actionName: string, private actionFunction: StateActionFunction<S, T>, private actionLog?: string) {
  }

  toString() {
    return this.actionLog ?? this.actionName;
  }

  isEqual(actionFunction: StateActionFunction<S, T>) {
    return this.actionFunction.name === actionFunction.name;
  }
}