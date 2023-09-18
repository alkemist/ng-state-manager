import {Injectable, Type, WritableSignal} from "@angular/core";
import {StatesMap} from "./states-map.js";
import {StateInterface} from "./state.interface.js";
import {ValueKey, ValueRecord} from "@alkemist/compare-engine";
import {SelectFunction} from './state-select.type.js';
import {ActionFunction} from './state-action.type.js';
import {StateIndex} from "./state-index.js";
import {StateDispatch} from "./state-dispatch.interface.js";
import {StateActionDispatch} from "./state-action-dispatch.interface.js";
import {isActionFunction} from "./utils.js";

@Injectable()
export class StateManager {
    private static index = new StatesMap();

    static getState<S extends ValueRecord>(stateKey: string): StateIndex<S> {
        return StateManager.index.get(stateKey) as StateIndex<S>;
    }

    static registerSelect<S extends ValueRecord, T>(
        stateKey: string,
        selectKey: string,
        selectFunction: SelectFunction<S, T>,
        path?: ValueKey | ValueKey[]
    ) {
        StateManager.index.setSelect(stateKey, selectKey, selectFunction, path);
    }

    static registerAction<S extends ValueRecord, T>(
        stateKey: string,
        actionKey: string,
        actionFunction: ActionFunction<S, T>,
        logText?: string,
    ) {
        StateManager.index.setAction(stateKey, actionKey, actionFunction, logText);
    }

    static registerObserver<S extends ValueRecord, T>(
        stateKey: string,
        selectKey: string,
        observerKey: string,
        observer: WritableSignal<T>,
    ) {
        StateManager.index.setObserver(stateKey, selectKey, observerKey, observer);
    }

    static registerState<S extends ValueRecord>(
        stateKey: string,
        configuration: StateInterface<S>
    ) {
        StateManager.index.setConfiguration<S>(stateKey, configuration);
    }

    static dispatchMultiple(dispatch: StateDispatch | StateDispatch[]) {
        if (!Array.isArray(dispatch)) {
            dispatch = [dispatch];
        }

        dispatch.forEach(action =>
            StateManager.dispatch(action.state, action.actions, action.payload)
        );
    }

    static dispatch<S extends ValueRecord, T>(
        state: Type<any>,
        actions: ActionFunction<S, T> | StateActionDispatch<S, T> | StateActionDispatch<S, T>[],
        payload?: T
    ) {
        let actionList: StateActionDispatch<S, T>[] = [];

        if (isActionFunction(actions)) {
            actionList.push({
                actionFunction: actions,
                payload
            });
        } else if (!Array.isArray(actions)) {
            actionList.push(actions);
        }

        StateManager.getState<S>(state.name).dispatch(actionList);
    }
}