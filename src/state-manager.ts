import { Injectable, Type, WritableSignal } from "@angular/core";
import { BaseState } from "./state.base.js";
import { IndexMap, StateMap } from "./index-map.js";
import { StateInterface } from "./state.interface.js";
import { ValueKey, ValueRecord } from "@alkemist/compare-engine";
import { SelectFunction } from './state-select.type.js';
import { ActionFunction } from './state-action.type.js';
import { StateDispatch } from './state-dispatch.js';

@Injectable()
export class StateManager {
  private static index = new IndexMap();

  static getState<S extends ValueRecord>(stateKey: string): StateMap<S> {
    return StateManager.index.get(stateKey) as StateMap<S>;
  }

  static registerSelect<S extends ValueRecord>(
    stateKey: string,
    stateClass: Type<BaseState>,
    selectKey: string,
    selectFunction: SelectFunction<S>,
    path?: ValueKey | ValueKey[]
  ) {
    StateManager.index.setSelect<S>(stateKey, selectKey, selectFunction, path);
  }

  static registerAction<S extends ValueRecord>(
    stateKey: string,
    stateClass: Type<BaseState>,
    actionKey: string,
    actionFunction: ActionFunction<S>,
    log?: string
  ) {
    StateManager.index.setAction(stateKey, actionKey, actionFunction, log);
  }

  static registerObserver<S extends ValueRecord>(
    stateKey: string,
    selectKey: string,
    observer: WritableSignal<any>,
  ) {
    StateManager.index.setObserver(stateKey, selectKey, observer);
  }

  static registerState<S extends ValueRecord>(
    stateKey: string,
    stateClass: Type<BaseState>,
    configuration: StateInterface<S>
  ) {
    StateManager.index.setConfiguration<S>(stateKey, configuration);
  }

  static dispatch(
    actions: StateDispatch | StateDispatch[]
  ) {
    if (actions instanceof StateDispatch) {
      actions = [ actions ];
    }

    actions.forEach(action => action.apply())
  }
}