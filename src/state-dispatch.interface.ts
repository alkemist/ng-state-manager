import {Type} from "@angular/core";
import {StateActionDispatch} from "./state-action-dispatch.interface.js";
import {ValueRecord} from "@alkemist/compare-engine";
import {ActionFunction} from "./state-action.type.js";

export interface StateDispatch<S extends ValueRecord = ValueRecord, T = any> {
    state: Type<any>,
    actions: ActionFunction<S, T> | StateActionDispatch<S, T> | StateActionDispatch<S, T>[]
    payload?: T
}