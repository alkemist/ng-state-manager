import { aObjectValueDefault, aStringValueDefault, ExampleComponent, UserInterface, UserService } from './test-data.js';
import { effect, Injector } from '@angular/core';
import { setUpSignalTesting, SignalTesting } from './setup-effect.js';


describe("State Decorator", () => {
  let signalTesting: SignalTesting;
  let onChangeSpy: jest.SpyInstance;
  let consoleLogSpy: jest.SpyInstance;
  let exampleComponent: ExampleComponent;
  let userService: UserService;

  beforeEach(() => {
    signalTesting = setUpSignalTesting();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    userService = new UserService();
    exampleComponent = new ExampleComponent(userService);
    onChangeSpy = jest.spyOn(exampleComponent, 'onChange');
  })

  it('should dispatch string', () => {
    signalTesting.runInTestingInjectionContext((injector: Injector) => {
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
      expect(aStringValueEffect).toEqual(aStringValueDefault);
      expect(onChangeSpy).toBeCalledTimes(1);

      onChangeSpy.mockReset();
      exampleComponent.dispatchStringValue(aStringValueTest);
      signalTesting.flushEffects();

      expect(exampleComponent.aStringValueObserver()).toEqual(aStringValueTest)
      expect(exampleComponent.aStringValueComputed()).toEqual(aStringValueTest)
      expect(aStringValueEffect).toEqual(aStringValueTest);
      expect(onChangeSpy).toBeCalledTimes(1);

      onChangeSpy.mockReset();
      exampleComponent.dispatchStringValue(aStringValueTest);

      expect(onChangeSpy).not.toBeCalled();
      expect(consoleLogSpy).toBeCalledTimes(2 * 4);
    })
  })

  it('should dispatch object', async () => {
    const aObjectValueTest: UserInterface = {
      name: 'user test',
      id: 1
    }

    expect(exampleComponent.aObjectValueObserver()).toEqual(aObjectValueDefault)

    onChangeSpy.mockReset();
    await exampleComponent.dispatchObjectValue(aObjectValueTest);

    expect(exampleComponent.aObjectValueObserver()).toEqual(aObjectValueTest)

    expect(consoleLogSpy).toBeCalledTimes(4);
  });

  afterEach(() => {
    consoleLogSpy.mockReset();
  })
});