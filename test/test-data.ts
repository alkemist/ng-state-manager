import { ValueRecord } from "@alkemist/compare-engine";
import { computed, Signal, WritableSignal } from '@angular/core';
import { Observe, Select, State, StateContext, StateManager } from '../src';
import { Action } from 'rxjs/internal/scheduler/Action';

export interface UserInterface {
  id: number,
  name: string,
}

export interface ExampleStateInterface extends ValueRecord {
  aStringValue: string;
  oObjectValue: UserInterface | null
}

export const exampleStateName = 'example';
export const aStringValueDefault = 'init';
export const aObjectValueDefault = null;

@State<ExampleStateInterface>({
  name: exampleStateName,
  defaults: {
    aStringValue: aStringValueDefault,
    oObjectValue: aObjectValueDefault,
  },
  showLog: true
})
export class ExampleState {
  @Select('aStringValue')
  static aStringValueSelector(state: ExampleStateInterface): string {
    return state.aStringValue;
  }

  @Select('oObjectValue')
  static anObjectValueSelector(state: ExampleStateInterface): UserInterface | null {
    return state.oObjectValue;
  }

  @Action('An string value action')
  static aStringValueAction(context: StateContext<ExampleStateInterface>, payload?: string) {
    context.patchState({
      aStringValue: payload
    })
  }

  @Action('An object value action')
  static aObjectValueAction(context: StateContext<ExampleStateInterface>, payload?: UserInterface) {
    context.patchState({
      oObjectValue: payload
    })
  }
}

export class ExampleComponent {
  @Observe(ExampleState, ExampleState.aStringValueSelector)
  aStringValueObserver!: WritableSignal<string>;

  @Observe(ExampleState, ExampleState.anObjectValueSelector)
  aObjectValueObserver!: WritableSignal<UserInterface | null>;

  aStringValueComputed: Signal<string>;

  constructor(private userService: UserService) {
    this.aStringValueComputed = computed(() => {
      this.onChange(this.aStringValueObserver());
      return this.aStringValueObserver();
    });
  }

  onChange(value: string) {
    return value;
  }

  dispatchStringValue(value: string) {
    StateManager.dispatch(
      ExampleState,
      ExampleState.aStringValueAction,
      value
    )
  }

  dispatchObjectValue(user: UserInterface) {
    return this.userService.login(user);
  }
}

export class UserService {
  getLoggedUser(user: UserInterface) {
    return new Promise<UserInterface>(resolve => resolve(user))
  }

  login(user: UserInterface): Promise<void> {
    return new Promise<void>(async resolve => {
      const userResponse: UserInterface = await this.getLoggedUser(user);

      StateManager.dispatch(
        ExampleState,
        {
          actionFunction: ExampleState.aObjectValueAction,
          payload: userResponse
        }
      )
      resolve();
    })
  }
}