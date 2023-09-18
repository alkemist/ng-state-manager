import { aStringValueDefault, ExampleComponent } from './test-data';
import { effect } from '@angular/core';
import { setUpSignalTesting, SignalTesting } from './setup-effect';


describe("State Decorator", () => {
  let signalTesting: SignalTesting;

  beforeEach(() => {
    signalTesting = setUpSignalTesting();
  })

  it('should work', () => {

    signalTesting.runInTestingInjectionContext((injector) => {
      const exampleComponent = new ExampleComponent();
      const aStringValueTest = 'test';
      let aStringValueEffect = '';

      effect(
        () => {
          aStringValueEffect = exampleComponent.aStringValueObserver();
        },
        { injector }
      );
      signalTesting.flushEffects();

      expect(exampleComponent.aStringValueObserver()).toEqual(aStringValueDefault)
      expect(exampleComponent.aStringValueComputed()).toEqual(aStringValueDefault)
      expect(aStringValueEffect).toEqual(aStringValueDefault)

      exampleComponent.dispatch(aStringValueTest);
      signalTesting.flushEffects();

      expect(exampleComponent.aStringValueObserver()).toEqual(aStringValueTest)
      expect(exampleComponent.aStringValueComputed()).toEqual(aStringValueTest)
      expect(aStringValueEffect).toEqual(aStringValueTest)

      exampleComponent.dispatch(aStringValueTest);
      signalTesting.flushEffects();

      expect(exampleComponent.aStringValueObserver()).toEqual(aStringValueDefault)
      expect(exampleComponent.aStringValueComputed()).toEqual(aStringValueDefault)
      expect(aStringValueEffect).toEqual(aStringValueDefault)
    })
  })
});