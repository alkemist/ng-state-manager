import {State} from "../src/state.decorator.js";
import {BaseState} from "../src/state.base.js";
import {Select} from "../src/state-select.decorator.js";
import {Action} from "../src/state-action.decorator.js";
import {Observe} from "../src/state-observe.decorator.js";
import {StateContext} from "../src/state.context.js";
import {signal, Signal} from "@angular/core";
import {StateManager} from "../src/state-manager.js";
import {ValueRecord} from "@alkemist/compare-engine";
import {BaseComponent} from "../src/component.base.js";

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
    property = 'value';
    
    @Select()
    aStringValueSelector(state: ExampleStateInterface): string {
        return state.aStringValue;
    }

    @Action()
    aAction(context: StateContext<ExampleStateInterface>): void {

    }
}

export class ExampleComponent extends BaseComponent {
    property = 'value';

    @Observe() aStringValueObserver: Signal<string> = signal<string>('');

    constructor(private stateManager: StateManager) {
        super();
    }

    dispatch() {
        //this.stateManager.dispatch()
    }
}