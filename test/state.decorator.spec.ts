import {
    aBooleanValueDefault,
    anObjectValueDefault,
    aStringValueDefault,
    Example,
    ExampleComponent,
    exampleStateName,
    UserInterface,
    UserService
} from './test-data.js';
import { effect, Injector } from '@angular/core';
import { setUpSignalTesting, SignalTesting } from './setup-effect.js';
import { StateManager } from '../src/state-manager.js';
import { UnknownAction } from '../src/models/unknown-action.error.js';


describe("State Decorator", () => {
    let signalTesting: SignalTesting;

    let onChangeSpy: jest.SpyInstance;
    let consoleLogSpy: jest.SpyInstance;
    let setLocalStorageSpy: jest.SpyInstance;
    let getLocalStorageSpy: jest.SpyInstance;

    let exampleComponent: ExampleComponent;
    let userService: UserService;
    let stateManager: StateManager;

    const aStringValueTest = 'test';
    const aObjectValueTest: UserInterface = {
        name: 'user test',
        id: 1
    }

    beforeEach(() => {
        signalTesting = setUpSignalTesting();
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

        setLocalStorageSpy = jest.spyOn(localStorage, 'setItem');
        getLocalStorageSpy = jest.spyOn(localStorage, 'getItem');

        stateManager = new StateManager();
        userService = new UserService(stateManager);
        exampleComponent = new ExampleComponent(stateManager, userService);
        onChangeSpy = jest.spyOn(exampleComponent, 'onChange');
    })

    it('should dispatch string', () => {
        signalTesting.runInTestingInjectionContext((injector: Injector) => {
            let aStringValueEffect = '';

            effect(
                () => {
                    aStringValueEffect = exampleComponent.aStringValueObserver();
                },
                { injector }
            );
            signalTesting.flushEffects();

            expect(exampleComponent.aStringValueObserver()).toEqual(aStringValueDefault);
            expect(exampleComponent.getStringValue()).toEqual(aStringValueDefault);
            expect(exampleComponent.aStringValueComputed()).toEqual(aStringValueDefault);
            expect(exampleComponent.aBooleanValueObserver()).toEqual(aBooleanValueDefault);
            expect(aStringValueEffect).toEqual(aStringValueDefault);
            expect(onChangeSpy).toBeCalledTimes(1);

            onChangeSpy.mockReset();
            setLocalStorageSpy.mockReset();
            exampleComponent.dispatchStringValue(aStringValueTest);
            signalTesting.flushEffects();

            expect(exampleComponent.aStringValueObserver()).toEqual(aStringValueTest);
            expect(exampleComponent.getStringValue()).toEqual(aStringValueTest);
            expect(exampleComponent.aStringValueComputed()).toEqual(aStringValueTest);
            expect(aStringValueEffect).toEqual(aStringValueTest);
            expect(onChangeSpy).toBeCalledTimes(1);
            expect(setLocalStorageSpy).toBeCalledTimes(1);
            expect(setLocalStorageSpy).toBeCalledWith(exampleStateName,
                `{` +
                `\"aStringValue\":\"${ aStringValueTest }\",` +
                `\"anObjectValue\":${ anObjectValueDefault },` +
                `\"aBooleanValue\":${ aBooleanValueDefault }` +
                `}`
            );

            onChangeSpy.mockReset();
            exampleComponent.dispatchStringValue(aStringValueTest);

            expect(onChangeSpy).not.toBeCalled();
            expect(consoleLogSpy).toBeCalledTimes(2 * 4);
        })
    })

    it('should dispatch object', async () => {
        expect(exampleComponent.anObjectValueObserver()).toEqual(anObjectValueDefault);

        await exampleComponent.dispatchObjectValue(aObjectValueTest);

        expect(exampleComponent.anObjectValueObserver()).toEqual(aObjectValueTest);
        expect(setLocalStorageSpy).toBeCalledTimes(1);
        expect(setLocalStorageSpy).toBeCalledWith(exampleStateName,
            `{` +
            `\"aStringValue\":\"${ aStringValueTest }\",` +
            `\"anObjectValue\":{\"name\":\"${ aObjectValueTest.name }\",\"id\":${ aObjectValueTest.id }},` +
            `\"aBooleanValue\":${ aBooleanValueDefault }` +
            `}`
        );

        expect(consoleLogSpy).toBeCalledTimes(4);
    });

    it('should throw errors', () => {
        expect(() => {
            stateManager.dispatch(new Example.aUnknownValueAction(''));
        }).toThrow(new UnknownAction('aUnknownValueAction'));
    })

    afterEach(() => {
        onChangeSpy.mockReset();
        consoleLogSpy.mockReset();
        setLocalStorageSpy.mockReset();
    })
});