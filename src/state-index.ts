import { CompareEngine, ValueKey, ValueRecord } from "@alkemist/compare-engine";
import { SmartMap } from "./smart-map.js";
import { StateSelect } from "./state-select.js";
import { StateAction } from "./state-action.js";
import { StateInterface } from "./state.interface.js";
import { StateSelectFunction } from "./state-select-function.type.js";
import { StateActionFunction } from "./state-action-function.type.js";
import { Type, WritableSignal } from "@angular/core";
import { StateContext } from "./state.context.js";
import { StateActionDispatch } from "./state-action-dispatch.interface.js";
import { UnknownAction } from './state.error.js';

export class StateIndex<C extends Type<Object> = Type<Object>, S extends ValueRecord = any> {
    private selects = new SmartMap<StateSelect<S>>();
    private actions = new SmartMap<StateAction<S>>();
    private configuration!: StateInterface<C, S>;
    private state!: CompareEngine<S>;
    private stateKey!: string;

    initContext(configuration: StateInterface<C, S>) {
        this.configuration = configuration;
        this.stateKey = configuration.class.name;

        let defaultsValue = configuration.defaults;

        if (configuration.enableLocalStorage) {
            const stored = localStorage.getItem(this.stateKey);
            if (stored) {
                defaultsValue = {
                    ...defaultsValue,
                    ...JSON.parse(stored)
                };
            }
        }

        this.state = new CompareEngine<S>(
            configuration.determineArrayIndexFn,
            defaultsValue,
            defaultsValue,
        );

        if (this.configuration.showLog) {
            console.log(`[State][${ this.stateKey }] Loaded`, defaultsValue);
        }
    }

    getState() {
        return <S>this.state.rightValue;
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

    select<T>(selectKey: string): T {
        return (<StateSelect<S, T>>this.selects.get(selectKey))
            .getValue(this.getState())
    }

    dispatch(actions: StateActionDispatch<S>[]) {
        actions.forEach(action =>
            this.apply(action.actionFunction, action.payload)
        )

        this.updateObservers();

        this.state.rightToLeft();

        if (this.configuration.enableLocalStorage) {
            localStorage.setItem(
                this.stateKey,
                JSON.stringify(
                    this.state.leftValue
                )
            );
        }
    }

    private apply<T>(actionFunction: StateActionFunction<S, T>, payload: T) {
        const stateAction = this.actions.find(
            (action) => action.isEqual(actionFunction)
        )

        if (!stateAction) {
            throw new UnknownAction(this.stateKey, actionFunction.name)
        }

        actionFunction.apply(actionFunction, [
            new StateContext(this.state),
            payload
        ])

        if (this.configuration.showLog) {
            console.log(`[State][${ this.stateKey }] Action "${ stateAction }"`);
            console.log(`[State][${ this.stateKey }] Payload`, payload);
            console.log(`[State][${ this.stateKey }] Before`, this.state.leftValue);
            console.log(`[State][${ this.stateKey }] After`, this.state.rightValue);
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