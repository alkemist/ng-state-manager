/*
{
      kind: 'class',
      name: 'ExampleState',
      metadata: undefined,
      addInitializer: [Function (anonymous)]
}

{
      kind: 'method',
      name: 'aAction',
      static: false,
      private: false,
      access: { has: [Function: has], get: [Function: get] },
      metadata: undefined,
      addInitializer: [Function (anonymous)]
}

{
      kind: 'field',
      name: 'aStringValueObserver',
      static: false,
      private: false,
      access: { has: [Function: has], get: [Function: get], set: [Function: set] },
      metadata: undefined,
      addInitializer: [Function (anonymous)]
}
 */


/*
{
      value: [Function: aStringValueSelector],
      writable: true,
      enumerable: false,
      configurable: true
    }



 */

import {AnyValue, ValueRecord} from "@alkemist/compare-engine";
import {StateContext} from "./state.context.js";

export type SelectFunction<T extends ValueRecord = ValueRecord>
    = (state: T) => AnyValue;

export type ActionFunction<T extends ValueRecord = ValueRecord>
    = (context: StateContext<T>, payload: AnyValue) => AnyValue;