import { ValueRecord } from '@alkemist/compare-engine';
import { StateInterface } from './state.interface.js';
import { StateContext } from './state.context.js';
import { SelectFunction } from './state-select.type.js';
import { ActionFunction } from './state-action.type.js';
import { StateManager } from './state-manager.js';
import { WritableSignal } from '@angular/core';

export class IndexMap extends Map<string, any> {
  setSelect<S extends ValueRecord>(stateKey: string, selectKey: string, selectFunction: SelectFunction<S>): this {
    let map = this.has(stateKey)
      ? this.get(stateKey) as StateMap<S>
      : new StateMap<S>();

    map.setSelect(selectKey, selectFunction);
    return this.set(stateKey, map);
  }

  setAction<S extends ValueRecord>(stateKey: string, actionKey: string, actionFunction: ActionFunction<S>): this {
    let map = this.has(stateKey)
      ? this.get(stateKey) as StateMap<S>
      : new StateMap<S>();

    map.setAction(actionKey, actionFunction);
    return this.set(stateKey, map);
  }

  setObserver<S extends ValueRecord>(stateKey: string, selectKey: string, observer: WritableSignal<any>): this {
    let map = this.has(stateKey)
      ? this.get(stateKey) as StateMap<S>
      : new StateMap<S>();

    map.setObserver(selectKey, observer);
    return this.set(stateKey, map);
  }

  setConfiguration<S extends ValueRecord>(stateKey: string, configuration: StateInterface<S>) {
    let map = this.has(stateKey)
      ? this.get(stateKey) as StateMap<S>
      : new StateMap<S>();

    map.initContext(configuration);
  }
}

export class StateMap<S extends ValueRecord = any> {
  selects = new Map<string, SelectFunction<S>>();
  actions = new Map<string, ActionFunction<S>>();
  observers = new Map<string, WritableSignal<any>>()

  context!: StateContext<S>;

  initContext(configuration: StateInterface<S>) {
    this.context = new StateContext<S>(configuration)
  }

  setSelect(selectKey: string, selectFunction: SelectFunction<S>) {
    this.selects.set(selectKey, selectFunction);
  }

  setAction(actionKey: string, actionFunction: ActionFunction<S>) {
    this.actions.set(actionKey, actionFunction);
  }

  setObserver(observerKey: string, observer: WritableSignal<any>) {
    this.observers.set(observerKey, observer);
  }

  setManager(stateManager: StateManager) {
    this.context.dispatch = stateManager.dispatch;
  }
}