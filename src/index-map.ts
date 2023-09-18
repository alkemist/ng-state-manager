import { ValueKey, ValueRecord } from '@alkemist/compare-engine';
import { StateInterface } from './state.interface.js';
import { StateContext } from './state.context.js';
import { SelectFunction } from './state-select.type.js';
import { ActionFunction } from './state-action.type.js';
import { WritableSignal } from '@angular/core';
import { StateObserver } from './state-observer.js';
import { StateSelect } from './state-select.js';
import { StateAction } from './state-action.js';
import { SmartMap } from './smart-map.js';

export class IndexMap extends Map<string, StateMap> {
  setSelect<S extends ValueRecord>(
    stateKey: string,
    selectKey: string,
    selectFunction: SelectFunction<S>,
    path?: ValueKey | ValueKey[]
  ): this {
    let map = this.has(stateKey)
      ? this.get(stateKey) as StateMap<S>
      : new StateMap<S>();

    map.setSelect(selectKey, selectFunction, path);
    return this.set(stateKey, map);
  }

  setAction<S extends ValueRecord>(stateKey: string, actionKey: string, actionFunction: ActionFunction<S>, actionLog?: string): this {
    let map = this.has(stateKey)
      ? this.get(stateKey) as StateMap<S>
      : new StateMap<S>();

    map.setAction(actionKey, actionFunction, actionLog);
    return this.set(stateKey, map);
  }

  setObserver<S extends ValueRecord>(
    stateKey: string,
    selectKey: string,
    observer: WritableSignal<any>
  ): this {
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
  private selects = new SmartMap<StateSelect<S>>();
  private actions = new SmartMap<StateAction<S>>();
  private observers = new SmartMap<StateObserver<S>>()
  private context!: StateContext<S>;

  initContext(configuration: StateInterface<S>) {
    this.context = new StateContext<S>(configuration)
  }

  getState() {
    return this.context.getState();
  }

  setSelect(
    selectKey: string,
    selectFunction: SelectFunction<S>,
    path?: ValueKey | ValueKey[]
  ) {
    const stateSelect = new StateSelect(selectFunction, path);
    this.selects.set(selectKey, stateSelect);
  }

  setAction(
    actionKey: string,
    actionFunction: ActionFunction<S>,
    actionLog?: string
  ) {
    const stateAction = new StateAction(actionFunction, actionLog);

    this.actions.set(actionKey, stateAction);
  }

  setObserver(
    observerKey: string,
    observer: WritableSignal<any>
  ) {
    const stateObserver = new StateObserver<S>(
      this.selects.get(observerKey),
      observer
    );

    stateObserver.update(this.getState());

    this.observers.set(observerKey, stateObserver);
  }

  apply(actionFunction: ActionFunction<S>, args: any[]) {
    const stateAction = this.actions.find(
      (action) => action.isEqual(actionFunction)
    )
    console.log('[Apply]', stateAction, args);

    actionFunction.apply(actionFunction, [
      this.context,
      ...args
    ])
  }

  updateObservers() {
    this.selects
      .filter((select) =>
        this.context.isUpdated(select.path)
      )
      .each((select, selectKey) => {
        console.log('[Observer] Update', selectKey)
        this.observers.get(selectKey).update(this.getState());
      })
    this.context.update();
  }
}