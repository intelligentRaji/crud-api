import { type Constructor } from '@core';

import { getCurrentInjector, setCurrentInjector } from '../context';
import { Injector } from '../injector';
import { type ClassProvider, type Provider } from '../types';

export interface ModuleMetadata {
  controllers?: Constructor<any>[];
  providers?: Provider<any>[] | Constructor<any>[];
  imports?: Constructor<any>[];
  exports?: Provider<any>[] | Constructor<any>[];
}

export function Module({
  providers = [],
  controllers = [],
  imports = [],
  exports = [],
}: ModuleMetadata) {
  return function <T extends Constructor>(target: T) {
    Reflect.defineMetadata('module', true, target);

    // Setup of new module injector
    const parent = getCurrentInjector();
    const injector = new Injector(parent, providers.map(transformProvider));

    // Preparing exports
    const exportsProviders = exports.map(transformProvider).map((provider) => {
      return {
        provide: provider.provide,
        useFactory: () => injector.get(provider.provide),
      };
    });
    Reflect.defineMetadata('exports', exportsProviders, target);

    // Importing imports
    importModules(injector, imports);

    return class extends target {
      constructor(...args: any[]) {
        setCurrentInjector(injector);
        super(...args);
        controllers.forEach((controller) => new controller());
        setCurrentInjector(parent);
      }
    };
  };
}

function importModules(injector: Injector, imports: Constructor<any>[]): void {
  imports.forEach((module) => {
    const isModule = Reflect.getMetadata('module', module);

    if (!isModule) {
      throw new Error(`${module.name} is not a module`);
    }

    const exports = Reflect.getMetadata('exports', module) as Provider<any>[];

    exports.forEach((exportProvider) => {
      injector.provide(exportProvider);
    });
  });
}

function transformProvider<T>(provider: Provider<T> | Constructor<T>): Provider<T> {
  if (isProviderConstructor(provider)) {
    return createClassProviderFromConstructor(provider);
  }

  return provider;
}

function isProviderConstructor<T>(target: Provider<T> | Constructor<T>): target is Constructor<T> {
  return typeof target === 'function';
}

function createClassProviderFromConstructor<T>(target: Constructor<T>): ClassProvider<T> {
  return {
    provide: target,
    useClass: target,
  };
}
