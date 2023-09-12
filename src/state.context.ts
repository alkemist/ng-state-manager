import {ValueRecord} from "@alkemist/compare-engine";

export interface StateContext<T extends ValueRecord> {
    /**
     * Get the current state.
     */
    getState(): T;

    /**
     * Reset the state to a new value.
     */
    setState(val: T): T;

    /**
     * Patch the existing state with the provided value.
     */
    patchState(val: Partial<T>): T;

    /**
     * Dispatch a new action and return the dispatched observable.
     */
    dispatch(actions: any | any[]): void;
}