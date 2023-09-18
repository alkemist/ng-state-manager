import { Type } from '@angular/core';
import { BaseState } from './state.base.js';
import { ActionFunction } from './state-action.type.js';
import { ValueRecord } from '@alkemist/compare-engine';
import { StateManager } from './state-manager.js';

export class StateDispatch<S extends ValueRecord = any> {
  private readonly args: any[];

  constructor(
    private state: Type<BaseState>,
    private actionFunction: ActionFunction<S>,
    ...args: any[]
  ) {
    this.args = args;
  }

  apply() {
    const index = StateManager.getState<S>(this.state.name);

    index.apply(this.actionFunction, this.args);
    index.updateObservers();
  }
}