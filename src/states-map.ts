import { ValueKey, ValueRecord } from '@alkemist/compare-engine';
import { StateInterface } from './state.interface.js';
import { StateSelectFunction } from './state-select-function.type.js';
import { StateActionFunction } from './state-action-function.type.js';
import { Type, WritableSignal } from '@angular/core';
import { StateIndex } from "./state-index.js";

export abstract class StatesMap {
    private static index = new Map<string, StateIndex>();

    static registerSelect<C extends Type<Object>, S extends ValueRecord, T>(
        stateKey: string,
        selectKey: string,
        selectFunction: StateSelectFunction<S, T>,
        path?: ValueKey | ValueKey[]
    ) {
        let map = StatesMap.getOrCreate<C, S>(stateKey);

        map.setSelect(selectKey, selectFunction, path);
        StatesMap.index.set(stateKey, map);
    }

    static registerAction<C extends Type<Object>, S extends ValueRecord, T>(
        stateKey: string,
        actionKey: string,
        actionFunction: StateActionFunction<S, T>,
        actionLog?: string
    ) {
        let map = StatesMap.getOrCreate<C, S>(stateKey);

        map.setAction(actionKey, actionFunction, actionLog);
        StatesMap.index.set(stateKey, map);
    }

    static registerObserver<C extends Type<Object>, S extends ValueRecord, T>(
        stateKey: string,
        selectKey: string,
        observerKey: string,
        observer: WritableSignal<T>
    ) {
        let map = StatesMap.getOrCreate<C, S>(stateKey);

        map.setObserver(selectKey, observerKey, observer);
        StatesMap.index.set(stateKey, map);
    }

    static registerState<C extends Type<Object>, S extends ValueRecord>(
        stateKey: string,
        configuration: StateInterface<C, S>
    ) {
        let map = StatesMap.getOrCreate<C, S>(stateKey);

        map.initContext(configuration);
    }

    static get<C extends Type<Object>, S extends ValueRecord>(stateKey: string) {
        return <StateIndex<C, S>>StatesMap.index.get(stateKey)
    }

    static has(stateKey: string) {
        return StatesMap.index.has(stateKey);
    }

    private static getOrCreate<C extends Type<Object>, S extends ValueRecord>(stateKey: string) {
        return StatesMap.has(stateKey)
            ? StatesMap.get<C, S>(stateKey)
            : new StateIndex<C, S>();
    }
}

