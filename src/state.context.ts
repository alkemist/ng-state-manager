import {CompareEngine, ValueRecord} from "@alkemist/compare-engine";

export class StateContext<S extends ValueRecord> {

    constructor(private state: CompareEngine<S>) {

    }

    getState(): S {
        return this.state.rightValue as S;
    }

    setState(val: S): S {
        this.state.updateRight(val);
        this.state.updateCompareIndex();
        return this.getState();
    }

    patchState(val: Partial<S>): S {
        return this.setState({
            ...this.getState(),
            val
        });
    }
}