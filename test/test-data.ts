import { State } from "../src/state.decorator.js";
import { BaseState } from "../src/state.base.js";
import { Select } from "../src/state-select.decorator.js";
import { Action } from "../src/state-action.decorator.js";
import { Observe } from "../src/state-observe.decorator.js";
import { StateContext } from "../src/state.context.js";
import { StateManager } from "../src/state-manager.js";
import { ValueRecord } from "@alkemist/compare-engine";
import { StateAction } from '../src/state-action';
import { signal } from '@angular/core';

interface ExampleStateInterface extends ValueRecord {
  aStringValue: string
}

@State<ExampleStateInterface>({
  name: 'example',
  defaults: {
    aStringValue: ''
  }
})
export class ExampleState extends BaseState {
  @Select()
  static aStringValueSelector(state: ExampleStateInterface): string {
    console.log('ExampleState', 'Select', state)
    return state.aStringValue;
  }

  @Action()
  static aAction(context: StateContext<ExampleStateInterface>, value: string): StateContext<ExampleStateInterface> {
    console.log('ExampleState', 'Action', value);
    context.setState({
      aStringValue: value
    })
    return context;
  }
}

export class ExampleComponent {
  @Observe(ExampleState, ExampleState.aStringValueSelector)
  aStringValueObserver = signal<string>('');

  constructor(private stateManager: StateManager) {
    //super();
  }

  dispatch(value: string) {
    this.stateManager.dispatch(
      new StateAction(ExampleState, ExampleState.aAction, value)
    )
  }
}