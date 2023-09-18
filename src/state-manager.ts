import {Injectable, WritableSignal} from "@angular/core";
import {StatesMap} from "./states-map.js";
import {StateInterface} from "./state.interface.js";
import {ValueKey, ValueRecord} from "@alkemist/compare-engine";
import {SelectFunction} from './state-select.type.js';
import {ActionFunction} from './state-action.type.js';
import {StateDispatch} from './state-dispatch.js';
import {StateIndex} from "./state-index.js";

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

    static dispatch(
        actions: StateDispatch | StateDispatch[]
    ) {
        if (actions instanceof StateDispatch) {
            actions = [actions];
        }

        actions.forEach(action => action.apply())
    }
}