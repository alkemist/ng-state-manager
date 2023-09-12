import {StateManager} from "../src/state-manager.js";
import {ExampleState} from "./test-data.js";

describe("State Decorator", () => {
    it('should work', () => {
        const stateManager = new StateManager();
        /*const exampleState = new ExampleState();*/
        //const exampleComponent = new ExampleComponent(stateManager);

        StateManager.register(ExampleState);

        expect(stateManager).toBeTruthy();
        /*expect(exampleComponent).toBeTruthy();

        expect(exampleComponent.aStringValueObserver()).toBe('');*/
    })
});