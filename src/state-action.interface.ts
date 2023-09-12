import {StateContext} from "./state.context.js";
import {ValueRecord} from "@alkemist/compare-engine";

export type StateAction<T extends ValueRecord> = (context: StateContext<T>) => void