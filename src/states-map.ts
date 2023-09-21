import { ValueKey, ValueRecord } from '@alkemist/compare-engine';
import { StateInterface } from './state.interface.js';
import { StateSelectFunction } from './state-select-function.type.js';
import { StateActionFunction } from './state-action-function.type.js';
import { WritableSignal } from '@angular/core';
import { StateIndex } from "./state-index.js";

export abstract class StatesMap {
  private static index = new Map<string, StateIndex>();

  static registerSelect<S extends ValueRecord, T>(
    stateKey: string,
    selectKey: string,
    selectFunction: StateSelectFunction<S, T>,
    path?: ValueKey | ValueKey[]
  ) {
    let map = StatesMap.index.has(stateKey)
      ? StatesMap.index.get(stateKey) as StateIndex<S>
      : new StateIndex<S>();

    map.setSelect(selectKey, selectFunction, path);
    StatesMap.index.set(stateKey, map);
  }

  static registerAction<S extends ValueRecord, T>(
    stateKey: string,
    actionKey: string,
    actionFunction: StateActionFunction<S, T>,
    actionLog?: string
  ) {
    let map = StatesMap.index.has(stateKey)
      ? StatesMap.index.get(stateKey) as StateIndex<S>
      : new StateIndex<S>();

    map.setAction(actionKey, actionFunction, actionLog);
    StatesMap.index.set(stateKey, map);
  }

  static registerObserver<S extends ValueRecord, T>(
    stateKey: string,
    selectKey: string,
    observerKey: string,
    observer: WritableSignal<T>
  ) {
    let map = StatesMap.index.has(stateKey)
      ? StatesMap.index.get(stateKey) as StateIndex<S>
      : new StateIndex<S>();

    map.setObserver(selectKey, observerKey, observer);
    StatesMap.index.set(stateKey, map);
  }

  static registerState<S extends ValueRecord>(
    stateKey: string,
    configuration: StateInterface<S>
  ) {
    let map = StatesMap.index.has(stateKey)
      ? StatesMap.index.get(stateKey) as StateIndex<S>
      : new StateIndex<S>();

    map.initContext(configuration);
  }

  static get<S extends ValueRecord>(stateKey: string) {
    return StatesMap.index.get(stateKey) as StateIndex<S>
  }
}

