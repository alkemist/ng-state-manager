import {Injectable, Type} from "@angular/core";
import {BaseState} from "./state.base.js";
import {ActionFunction, SelectFunction} from "./metadata-decorator.interface.js";
import {TreeMap} from "./tree-map.js";
import {StateInterface} from "./state.interface.js";
import {ValueRecord} from "@alkemist/compare-engine";

@Injectable()
export class StateManager {
    private static selects = new TreeMap<SelectFunction>();
    private static actions = new TreeMap<ActionFunction>();
    private static observers = new TreeMap<any>();

    static registerSelect<T extends ValueRecord>(stateName: string, selectKey: string, selectFunction: SelectFunction<T>) {
        StateManager.selects.setChild(stateName, selectKey, selectFunction);
    }

    static registerAction<T extends ValueRecord>(stateName: string, actionKey: string, actionFunction: ActionFunction<T>) {
        StateManager.actions.setChild(stateName, actionKey, actionFunction);
    }

    static registerObserver(name: string, observer: any) {

    }

    static registerState<T>(name: string, configuration: StateInterface<T>) {

    }

    static register(state: Type<BaseState>) {
        console.log("[StateManager] Register", state.name);
        console.log("[StateManager] Register selects", StateManager.selects.get(state.name));
        console.log("[StateManager] Register actions", StateManager.actions.get(state.name));
        console.log("[StateManager] Register observers", StateManager.observers.get(state.name));
    }

    dispatch(actions: any | any[]) {

    }
}