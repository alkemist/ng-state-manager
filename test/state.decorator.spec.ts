import {ExampleComponent, ExampleState} from "./test-data.js";
import {StateManager} from "../src/state-manager.js";

describe("State Decorator", () => {
    it('should work', () => {
        const stateManager = new StateManager();
        const exampleState = new ExampleState();
        const exampleComponent = new ExampleComponent(stateManager);

        expect(stateManager).toBeTruthy();
        expect(exampleState).toBeTruthy();
        expect(exampleComponent).toBeTruthy();
    })
});