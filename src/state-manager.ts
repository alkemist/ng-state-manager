import { Injectable, Type } from "@angular/core";
import { ValueRecord } from "@alkemist/compare-engine";
import { StateActionFunction } from './state-action-function.type.js';
import { StateActionDispatch } from "./state-action-dispatch.interface.js";
import { isActionFunction } from "./utils.js";
import { StatesMap } from './states-map.js';
import { StateSelectFunction } from './state-select-function.type.js';
import { StateDispatch } from './state-dispatch.interface.js';
import { UnknownState } from './state.error.js';

@Injectable()
export class StateManager {
    select<C extends Type<Object>, S extends ValueRecord, T>(
        state: C,
        select: StateSelectFunction<S, T>
    ) {
        return StatesMap.get<C, S>(state.name).select<T>(select.name);
    }

    dispatchMultiple(dispatch: StateDispatch | StateDispatch[]) {
        if (!Array.isArray(dispatch)) {
            dispatch = [ dispatch ];
        }

        dispatch.forEach(action =>
            this.dispatch(action.state, action.actions, action.payload)
        );
    }

    dispatch<C extends Type<Object>, S extends ValueRecord, T>(
        state: C,
        actions: StateActionFunction<S, T> | StateActionDispatch<S, T> | StateActionDispatch<S, T>[],
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

        if (!StatesMap.has(state.name)) {
            throw new UnknownState(state.name);
        }

        StatesMap.get<C, S>(state.name).dispatch(actionList);
    }
}