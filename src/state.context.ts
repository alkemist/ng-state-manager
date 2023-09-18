import { CompareEngine, ValueKey, ValueRecord } from "@alkemist/compare-engine";
import { StateInterface } from './state.interface.js';

export class StateContext<S extends ValueRecord> {
  state: CompareEngine<S>;

  constructor(private configuration: StateInterface<S>) {
    this.state = new CompareEngine<S>(
      configuration.determineArrayIndexFn,
      configuration.defaults,
      configuration.defaults,
    );
  }

  update() {
    this.state.rightToLeft();
  }

  getState(): S {
    return this.state.rightValue as S;
  }

  setState(val: S): S {
    this.state.updateRight(val);
    this.state.updateCompareIndex();
    return this.getState();
  }

  patchState(val: Partial<S>): S {
    return this.getState();
  }

  isUpdated(path?: ValueKey | ValueKey[]) {
    if (!path) {
      return true;
    }

    console.log('[Context] Is updated ?',
      path,
      this.state,
      this.state.getRightState(path)
    )
    return this.state.getRightState(path).isUpdated;
  }
}