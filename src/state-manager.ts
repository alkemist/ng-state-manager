import { Injectable, Type } from "@angular/core";
import { ValueRecord } from "@alkemist/compare-engine";
import { StateActionFunction } from './state-action-function.type.js';
import { StateActionDispatch } from "./state-action-dispatch.interface.js";
import { isActionFunction } from "./utils.js";
import { StatesMap } from './states-map.js';
import { StateSelectFunction } from './state-select-function.type.js';

@Injectable()
export class StateManager {
  select<S extends ValueRecord, T>(
    state: Type<any>,
    select: StateSelectFunction<S, T>
  ) {
    return StatesMap.get<S>(state.name).select<T>(select.name);
  }

  dispatch<S extends ValueRecord, T>(
    state: Type<any>,
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

    StatesMap.get<S>(state.name).dispatch(actionList);
  }
}