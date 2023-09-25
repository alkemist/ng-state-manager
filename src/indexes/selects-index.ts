import { CompareEngine, ValueKey, ValueRecord } from "@alkemist/compare-engine";
import { StateSelect } from "../models/state-select.js";
import { StateConfiguration } from "../models/state-configuration.interface.js";
import { StateSelectFunction } from "../models/state-select-function.type.js";
import { StateActionFunction } from "../models/state-action-function.type.js";
import { WritableSignal } from "@angular/core";
import { StateContext } from '../models/state.context.js';
import { SmartMap } from '@alkemist/smart-tools';

export class SelectsIndex<C extends Object = Object, S extends ValueRecord = any> {
  private selects = new SmartMap<StateSelect<S>>();
  private configuration!: StateConfiguration<C, S>;
  private state!: CompareEngine<S>;
  private stateKey!: string;

  initContext(configuration: StateConfiguration<C, S>) {
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
      console.group(`%c [State][${ this.stateKey }] Loaded`, 'color: #2196F3; font-weight: bold');// blue
      console.log(`%c Init state`, 'color: #FD8182; font-weight: bold', defaultsValue);// grey
      console.groupEnd();
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

  apply<T>(actionKey: string, actionFunction: StateActionFunction<S, T>, payload: T) {
    actionFunction.apply(actionFunction, [
      new StateContext(this.state),
      payload
    ])

    if (this.configuration.showLog) {
      console.group(`%c [State][${ this.stateKey }] Action "${ actionKey }"`, 'color: #2196F3; font-weight: bold');// blue
      console.log(`%c Payload`, 'color: #bada55; font-weight: bold', payload);//green
      console.log(`%c Before`, 'color: #9E9E9E; font-weight: bold', this.state.leftValue);//grey
      console.log(`%c After`, 'color: #FD8182; font-weight: bold', this.state.rightValue);//red
      console.groupEnd();
    }
  }

  update() {
    this.selects
      .filter((select) =>
        select.path
          ? !this.state.getRightState(select.path).isEqual
          : true
      )
      .each((select) =>
        select.update(this.getState())
      )

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
}