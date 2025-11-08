import { type Constructor, defineMetadata, getMetadata } from '@core';

import { getCurrentInjector, setCurrentInjector } from '../context';
import { Injector } from '../injector';
import { type Provider } from '../types';
import { type DIToken } from '../types/token';

export interface ModuleMetadata {
  controllers?: Constructor[];
  providers?: Provider[];
  imports?: Constructor[];
  exports?: DIToken[];
}

export function Module({
  providers = [],
  controllers = [],
  imports = [],
  exports = [],
}: ModuleMetadata) {
  return function <T extends Constructor>(target: T) {
    const parent = getCurrentInjector();
    const injector = new Injector(parent, providers);

    const exportsProviders = exports.map((token) => {
      return {
        provide: token,
        useFactory: () => injector.get(token),
      };
    });

    defineMetadata(
      {
        module: true,
        exports: exportsProviders,
      },
      target,
    );

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

function importModules(injector: Injector, imports: Constructor[]): void {
  imports.forEach((module) => {
    const moduleMetadata = getMetadata(module);

    if (!moduleMetadata.module) {
      throw new Error(`${module.name} is not a module`);
    }

    const exports: Provider[] = moduleMetadata.exports;

    exports.forEach((exportProvider) => {
      injector.provide(exportProvider);
    });

    new module();
  });
}
