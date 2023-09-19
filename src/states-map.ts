import { ValueKey, ValueRecord } from '@alkemist/compare-engine';
import { StateInterface } from './state.interface.js';
import { StateSelectFunction } from './state-select-function.type.js';
import { StateActionFunction } from './state-action-function.type.js';
import { WritableSignal } from '@angular/core';
import { StateIndex } from "./state-index.js";

export class StatesMap extends Map<string, StateIndex> {
  setSelect<S extends ValueRecord, T>(
    stateKey: string,
    selectKey: string,
    selectFunction: StateSelectFunction<S, T>,
    path?: ValueKey | ValueKey[]
  ): this {
    let map = this.has(stateKey)
      ? this.get(stateKey) as StateIndex<S>
      : new StateIndex<S>();

    map.setSelect(selectKey, selectFunction, path);
    return this.set(stateKey, map);
  }

  setAction<S extends ValueRecord>(stateKey: string, actionKey: string, actionFunction: StateActionFunction<S>, actionLog?: string): this {
    let map = this.has(stateKey)
      ? this.get(stateKey) as StateIndex<S>
      : new StateIndex<S>();

    map.setAction(actionKey, actionFunction, actionLog);
    return this.set(stateKey, map);
  }

  setObserver<S extends ValueRecord>(
    stateKey: string,
    selectKey: string,
    observerKey: string,
    observer: WritableSignal<any>
  ): this {
    let map = this.has(stateKey)
      ? this.get(stateKey) as StateIndex<S>
      : new StateIndex<S>();

    map.setObserver(selectKey, observerKey, observer);
    return this.set(stateKey, map);
  }

  setConfiguration<S extends ValueRecord>(stateKey: string, configuration: StateInterface<S>) {
    let map = this.has(stateKey)
      ? this.get(stateKey) as StateIndex<S>
      : new StateIndex<S>();

    map.initContext(configuration);
  }
}

