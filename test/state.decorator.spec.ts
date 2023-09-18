import {aStringValueDefault, ExampleComponent} from './test-data.js';
import {effect, Injector} from '@angular/core';
import {setUpSignalTesting, SignalTesting} from './setup-effect.js';


describe("State Decorator", () => {
    let signalTesting: SignalTesting;
    let onChangeSpy: jest.SpyInstance;

    beforeEach(() => {
        signalTesting = setUpSignalTesting();
    })

    it('should work', () => {
        signalTesting.runInTestingInjectionContext((injector: Injector) => {
            const exampleComponent = new ExampleComponent();
            const aStringValueTest = 'test';
            let aStringValueEffect = '';

            onChangeSpy = jest.spyOn(exampleComponent, 'onChange');

            effect(
                () => {
                    aStringValueEffect = exampleComponent.aStringValueObserver();
                },
                {injector}
            );
            signalTesting.flushEffects();

            expect(exampleComponent.aStringValueObserver()).toEqual(aStringValueDefault)
            expect(exampleComponent.aStringValueComputed()).toEqual(aStringValueDefault)
            expect(aStringValueEffect).toEqual(aStringValueDefault);
            expect(onChangeSpy).toBeCalledTimes(1);

            onChangeSpy.mockReset();
            exampleComponent.dispatch(aStringValueTest);
            signalTesting.flushEffects();

            expect(exampleComponent.aStringValueObserver()).toEqual(aStringValueTest)
            expect(exampleComponent.aStringValueComputed()).toEqual(aStringValueTest)
            expect(aStringValueEffect).toEqual(aStringValueTest);
            expect(onChangeSpy).toBeCalledTimes(1);

            onChangeSpy.mockReset();
            exampleComponent.dispatch(aStringValueTest);

            expect(onChangeSpy).not.toBeCalled();
        })
    })
});