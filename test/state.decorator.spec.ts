import { StateManager } from "../src/state-manager.js";
import { ExampleComponent, ExampleState } from "./test-data.js";

describe("State Decorator", () => {

  beforeEach(() => {

  })

  it('should work', () => {
    StateManager.register(ExampleState);

    const stateManager = new StateManager();

    expect(stateManager).toBeTruthy();

    const exampleComponent = new ExampleComponent(stateManager);
    exampleComponent.dispatch('test');

    expect(exampleComponent.aStringValueObserver()).toEqual('test')
  })
});