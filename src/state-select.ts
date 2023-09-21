import { StateSelectFunction } from './state-select-function.type.js';
import { ValueKey, ValueRecord } from '@alkemist/compare-engine';
import { SmartMap } from "./smart-map.js";
import { WritableSignal } from "@angular/core";

export class StateSelect<S extends ValueRecord, T = any> {
  private observers = new SmartMap<WritableSignal<T>>()

  constructor(private selectFunction: StateSelectFunction<S, T>, private _path?: ValueKey | ValueKey[]) {
  }

  get path() {
    return this._path;
  }

  addObserver(observerKey: string, observer: WritableSignal<T>) {
    this.observers.set(observerKey, observer);
    return this;
  }

  getValue(state: S) {
    return this.selectFunction.apply(this.selectFunction, [
      state
    ]) as T;
  }

  update(state: S) {
    this.observers.each(
      (observer) => observer.set(this.getValue(state))
    )
  }
}