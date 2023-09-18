import { WritableSignal } from '@angular/core';
import { ValueRecord } from '@alkemist/compare-engine';
import { StateSelect } from './state-select.js';

export class StateObserver<S extends ValueRecord, T = any> {
  constructor(private stateSelect: StateSelect<S, T>, private observer: WritableSignal<T>) {
  }

  update(state: S) {
    this.observer.set(
      this.stateSelect.apply(state)
    );
  }
}