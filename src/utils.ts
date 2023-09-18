import {StateActionDispatch} from "./state-action-dispatch.interface.js";
import {ActionFunction} from "./state-action.type.js";
import {CompareHelper, ValueRecord} from "@alkemist/compare-engine";

export function isActionFunction<S extends ValueRecord, T>(
    actions: ActionFunction<S, T> | StateActionDispatch<S, T> | StateActionDispatch<S, T>[]
): actions is ActionFunction<S, T> {
    return !Array.isArray(actions) && CompareHelper.isFunction(actions);
}