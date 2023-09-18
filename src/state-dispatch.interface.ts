import {Type} from "@angular/core";
import {StateActionDispatch} from "./state-action-dispatch.js";

export interface StateDispatch {
    state: Type<any>,
    actions: StateActionDispatch | StateActionDispatch[]
}