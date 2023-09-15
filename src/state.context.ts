import { CompareEngine, ValueRecord } from "@alkemist/compare-engine";
import { StateInterface } from './state.interface.js';

export class StateContext<S extends ValueRecord> {
  state: CompareEngine<S>;

  constructor(private configuration: StateInterface<S>) {
    this.state = new CompareEngine<S>(
      undefined,
      configuration.defaults,
      configuration.defaults,
    );
  }

  getState(): S {
    return this.state.rightValue as S;
  }

  setState(val: S): S {
    this.state.updateRight(val);
    return this.getState();
  }

  patchState(val: Partial<S>): S {
    return this.getState();
  }

  dispatch(actions: any | any[]): void {
    // Replaced by State Manager dispatch
  }
}