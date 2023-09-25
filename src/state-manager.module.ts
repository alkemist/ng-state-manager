import { StateManager } from './state-manager.service.js';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    StateManager
  ],
  bootstrap: []
})
export class StateManagerModule extends NgModule {
  ngModule = StateManagerRootModule;
  type = StateManagerModule;
  declarations = [];
  imports = [];
  exports = [];
  providers: Array<Provider> = [ StateManager ];
  bootstrap = [];

  static forRoot(): ModuleWithProviders<StateManagerRootModule> {
    return {
      ngModule: StateManagerRootModule,
      providers: [ StateManager ]
    };
  }
}

/**
 * @ignore
 */
@NgModule()
export class StateManagerRootModule extends NgModule {

}