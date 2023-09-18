import { State } from "../src/state.decorator.js";
import { BaseState } from "../src/state.base.js";
import { Select } from "../src/state-select.decorator.js";
import { Action } from "../src/state-action.decorator.js";
import { Observe } from "../src/state-observe.decorator.js";
import { StateContext } from "../src/state.context.js";
import { StateManager } from "../src/state-manager.js";
import { ValueRecord } from "@alkemist/compare-engine";
import { StateDispatch } from '../src/state-dispatch';
import { computed, Signal, WritableSignal } from '@angular/core';

interface ExampleStateInterface extends ValueRecord {
  aStringValue: string
}

export const exampleStateName = 'example';
export const aStringValueDefault = 'init';

@State<ExampleStateInterface>({
  name: exampleStateName,
  defaults: {
    aStringValue: aStringValueDefault
  }
})
export class ExampleState extends BaseState {
  @Select('aStringValue')
  static aStringValueSelector(state: ExampleStateInterface): string {
    return state.aStringValue;
  }

  @Action('An action')
  static aAction(context: StateContext<ExampleStateInterface>, payload: string): StateContext<ExampleStateInterface> {
    context.setState({
      aStringValue: payload
    })
    return context;
  }
}

export class ExampleComponent {
  @Observe(ExampleState, ExampleState.aStringValueSelector)
  aStringValueObserver!: WritableSignal<string>;

  aStringValueComputed: Signal<string>;

  constructor() {
    this.aStringValueComputed = computed(() => {
      return this.aStringValueObserver();
    });
  }

  dispatch(value: string) {
    StateManager.dispatch(
      new StateDispatch(ExampleState, ExampleState.aAction, value)
    )
  }
}