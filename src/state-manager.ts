import { Injectable, Type, WritableSignal } from "@angular/core";
import { BaseState } from "./state.base.js";
import { IndexMap, StateMap } from "./index-map.js";
import { StateInterface } from "./state.interface.js";
import { ValueRecord } from "@alkemist/compare-engine";
import { SelectFunction } from './state-select.type.js';
import { ActionFunction } from './state-action.type.js';
import { StateAction } from './state-action.js';

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
    selectFunction: SelectFunction<S>
  ) {
    StateManager.index.setSelect<S>(stateKey, selectKey, selectFunction);
  }

  static registerAction<S extends ValueRecord>(
    stateKey: string,
    stateClass: Type<BaseState>,
    actionKey: string,
    actionFunction: ActionFunction<S>
  ) {
    StateManager.index.setAction(stateKey, actionKey, actionFunction);
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

  static register(state: Type<BaseState>) {
    const index = StateManager.getState(state.name);

    console.log("[StateManager] Register", state.name);
    console.log("[StateManager] Register index", index);

    /*index.selects.forEach((selectFunction) => {
      selectFunction.apply(selectFunction, [ index.context!.state.rightValue! ])
    })

    index.actions.forEach((actionFunction) => {
      actionFunction.apply(actionFunction, [ index.context!, ...actionFunction.arguments.slice(1) ])
    })*/
  }

  dispatch(
    actions: StateAction | StateAction[]
  ) {
    if (actions instanceof StateAction) {
      actions = [ actions ];
    }

    actions.forEach(action => action.apply(this))
  }
}