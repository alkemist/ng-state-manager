import {Injectable, Type, WritableSignal} from "@angular/core";
import {StatesMap} from "./states-map.js";
import {StateInterface} from "./state.interface.js";
import {ValueKey, ValueRecord} from "@alkemist/compare-engine";
import {SelectFunction} from './state-select.type.js';
import {ActionFunction} from './state-action.type.js';
import {StateIndex} from "./state-index.js";
import {StateActionDispatch} from "./state-action-dispatch.js";
import {StateDispatch} from "./state-dispatch.interface.js";

@Injectable()
export class StateManager {
    private static index = new StatesMap();

    static getState<S extends ValueRecord>(stateKey: string): StateIndex<S> {
        return StateManager.index.get(stateKey) as StateIndex<S>;
    }

    static registerSelect<S extends ValueRecord>(
        stateKey: string,
        selectKey: string,
        selectFunction: SelectFunction<S>,
        path?: ValueKey | ValueKey[]
    ) {
        StateManager.index.setSelect<S>(stateKey, selectKey, selectFunction, path);
    }

    static registerAction<S extends ValueRecord>(
        stateKey: string,
        actionKey: string,
        actionFunction: ActionFunction<S>,
        logText?: string,
    ) {
        StateManager.index.setAction(stateKey, actionKey, actionFunction, logText);
    }

    static registerObserver<S extends ValueRecord>(
        stateKey: string,
        selectKey: string,
        observerKey: string,
        observer: WritableSignal<any>,
    ) {
        StateManager.index.setObserver(stateKey, selectKey, observerKey, observer);
    }

    static registerState<S extends ValueRecord>(
        stateKey: string,
        configuration: StateInterface<S>
    ) {
        StateManager.index.setConfiguration<S>(stateKey, configuration);
    }

    static dispatchMultiple(actions: StateDispatch | StateDispatch[]) {
        if (!Array.isArray(actions)) {
            actions = [actions];
        }

        actions.forEach(action => StateManager.dispatch(action.state, action.actions));
    }

    static dispatch(
        state: Type<any>,
        actions: StateActionDispatch | StateActionDispatch[]
    ) {
        if (!Array.isArray(actions)) {
            actions = [actions];
        }

        StateManager.getState(state.name).dispatch(actions);
    }
}