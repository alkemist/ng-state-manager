import {State} from "../src/state.decorator.js";
import {Select} from "../src/state-select.decorator.js";
import {Action} from "../src/state-action.decorator.js";
import {Observe} from "../src/state-observe.decorator.js";
import {StateContext} from "../src/state.context.js";
import {StateManager} from "../src/state-manager.js";
import {ValueRecord} from "@alkemist/compare-engine";
import {computed, Signal, WritableSignal} from '@angular/core';

interface UserInterface {
    id: number,
    name: string,
}

interface ExampleStateInterface extends ValueRecord {
    aStringValue: string;
    oObjectValue: UserInterface | null
}

export const exampleStateName = 'example';
export const aStringValueDefault = 'init';

@State<ExampleStateInterface>({
    name: exampleStateName,
    defaults: {
        aStringValue: aStringValueDefault,
        oObjectValue: null,
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

    constructor() {
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

    dispatchObjectValue(value: UserInterface) {
        StateManager.dispatch(
            ExampleState,
            {
                actionFunction: ExampleState.aObjectValueAction,
                payload: value
            }
        )
    }
}

export class UserService {
    getLoggedUser(): Promise<UserInterface> {
        return Promise.resolve({
            name: 'logged user name',
            id: 1
        })
    }
}