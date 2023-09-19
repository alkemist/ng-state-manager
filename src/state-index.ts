import {CompareEngine, ValueKey, ValueRecord} from "@alkemist/compare-engine";
import {SmartMap} from "./smart-map.js";
import {StateSelect} from "./state-select.js";
import {StateAction} from "./state-action.js";
import {StateInterface} from "./state.interface.js";
import {StateSelectFunction} from "./state-select-function.type.js";
import {StateActionFunction} from "./state-action-function.type.js";
import {WritableSignal} from "@angular/core";
import {StateContext} from "./state.context.js";
import {StateActionDispatch} from "./state-action-dispatch.interface.js";

export class StateIndex<S extends ValueRecord = any> {
    private selects = new SmartMap<StateSelect<S>>();
    private actions = new SmartMap<StateAction<S>>();
    private configuration!: StateInterface<S>;
    private state!: CompareEngine<S>;

    initContext(configuration: StateInterface<S>) {
        this.configuration = configuration;

        let defaultsValue = configuration.defaults;

        /*if (configuration.enableLocalStorage) {
            const stored = localStorage.getItem(configuration.name);
            if (stored) {
                defaultsValue = {
                    ...defaultsValue,
                    ...JSON.parse(stored)
                };
            }
        }*/

        this.state = new CompareEngine<S>(
            configuration.determineArrayIndexFn,
            defaultsValue,
            defaultsValue,
        );
    }

    getState() {
        return this.state.rightValue as S;
    }

    setSelect<T>(
        selectKey: string,
        selectFunction: StateSelectFunction<S, T>,
        path?: ValueKey | ValueKey[]
    ) {
        const stateSelect = new StateSelect(selectFunction, path);
        this.selects.set(selectKey, stateSelect);
    }

    setAction<T>(
        actionKey: string,
        actionFunction: StateActionFunction<S, T>,
        actionLog?: string
    ) {
        const stateAction = new StateAction(actionKey, actionFunction, actionLog);

        this.actions.set(actionKey, stateAction);
    }

    setObserver(
        selectKey: string,
        observerKey: string,
        observer: WritableSignal<any>
    ) {
        this.selects.get(selectKey)
            .addObserver(observerKey, observer)
            .update(this.getState());
    }

    dispatch(actions: StateActionDispatch<S>[]) {
        actions.forEach(action =>
            this.apply(action.actionFunction, action.payload)
        )

        this.updateObservers();

        this.state.rightToLeft();

        if (this.configuration.enableLocalStorage) {
            localStorage.setItem(
                this.configuration.name,
                JSON.stringify(
                    this.state.leftValue
                )
            );
        }
    }

    private apply<T>(actionFunction: StateActionFunction<S, T>, payload: T) {
        actionFunction.apply(actionFunction, [
            new StateContext(this.state),
            payload
        ])

        if (this.configuration.showLog) {
            const stateAction = this.actions.find(
                (action) => action.isEqual(actionFunction)
            )

            console.log(`[State][${this.configuration.name}] Action "${stateAction}"`);
            console.log(`[State][${this.configuration.name}] Payload`, payload);
            console.log(`[State][${this.configuration.name}] Before`, this.state.leftValue);
            console.log(`[State][${this.configuration.name}] After`, this.state.rightValue);
        }
    }

    private updateObservers() {
        this.selects
            .filter((select) =>
                select.path
                    ? !this.state.getRightState(select.path).isEqual
                    : true
            )
            .each((select) =>
                select.update(this.getState())
            )
    }
}