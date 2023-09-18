import { SelectFunction } from './state-select.type.js';
import { ValueKey, ValueRecord } from '@alkemist/compare-engine';

export class StateSelect<S extends ValueRecord, T = any> {
  constructor(private selectFunction: SelectFunction<S>, private _path?: ValueKey | ValueKey[]) {
  }

  get path() {
    return this._path;
  }

  apply(state: S) {
    return this.selectFunction.apply(this.selectFunction, [
      state
    ]) as T
  }
}