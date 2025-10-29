import { getCurrentInjector } from '../di/context';
import { Router } from '../routing/router';
import type { Constructor } from './types/constructor';

export class Application {
  static init(module: Constructor) {
    const isModule = Reflect.getMetadata('module', module);

    if (!isModule) {
      throw new Error(`${module.name} is not a module, please use @Module decorator to init App`);
    }

    const injector = getCurrentInjector();
    injector.provide({
      provide: Router,
      useClass: Router,
    });

    new module();
  }
}
