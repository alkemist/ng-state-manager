import { Injectable, Type } from "@angular/core";
import { ValueRecord } from "@alkemist/smart-tools";
import { StatesMap } from './indexes/states-map.js';
import { StateSelectFunction } from './models/state-select-function.type.js';
import { StateActionClass } from './models/state-action-class.interface.js';

@Injectable()
export class StateManager {
  select<C extends Object, S extends ValueRecord, T>(
    stateClass: Type<C>,
    selectFunction: StateSelectFunction<S, T>
  ) {
    return StatesMap.getSelectsIndex<C, S>(stateClass.name).select<T>(selectFunction.name);
  }

  dispatch(actions: StateActionClass | StateActionClass[]) {
    if (!Array.isArray(actions)) {
      actions = [ actions ];
    }

    StatesMap.dispatch(actions);
  }
}