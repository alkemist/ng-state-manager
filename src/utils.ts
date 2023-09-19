import { StateActionDispatch } from "./state-action-dispatch.interface.js";
import { StateActionFunction } from "./state-action-function.type.js";
import { CompareHelper, ValueRecord } from "@alkemist/compare-engine";

export function isActionFunction<S extends ValueRecord, T>(
  actions: StateActionFunction<S, T> | StateActionDispatch<S, T> | StateActionDispatch<S, T>[]
): actions is StateActionFunction<S, T> {
  return !Array.isArray(actions) && CompareHelper.isFunction(actions);
}