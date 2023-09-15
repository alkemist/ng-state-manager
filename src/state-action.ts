import { Type, WritableSignal } from '@angular/core';
import { BaseState } from './state.base.js';
import { ActionFunction } from './state-action.type.js';
import { ValueRecord } from '@alkemist/compare-engine';
import { StateManager } from './state-manager.js';

export class StateAction<S extends ValueRecord = any> {
  private readonly args: any[];

  constructor(
    private state: Type<BaseState>,
    private actionFunction: ActionFunction<S>,
    ...args: any[]
  ) {
    this.args = args;
  }

  apply(stateManager: StateManager) {
    const index = StateManager.getState<S>(this.state.name);
    index.setManager(stateManager);

    this.actionFunction.apply(this.actionFunction, [
      index.context!,
      ...this.args
    ])

    index.selects.forEach((select, selectKey) => {
      const observer = index.observers.get(selectKey) as WritableSignal<any>;
      console.log('[Action] Apply select', observer);

      const selectValue = select.apply(select, [
        index.context.getState()
      ]);
      
      observer.set(selectValue);
    })
  }
}