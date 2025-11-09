import { assertIsModule } from 'di/errors';
import { getModuleMetadata } from 'di/helpers';
import type { DIToken } from 'di/types/token';

import { type Constructor, defineMetadata } from '@core';

import { getCurrentInjector, setCurrentInjector } from '../context';
import { Injector } from '../injector';
import { type ModuleMetadata } from '../types';

export type ModuleDecoratorOptions = Partial<Omit<ModuleMetadata, 'module' | 'injector'>>;

export function Module({
  providers = [],
  controllers = [],
  imports = [],
  exports = [],
}: ModuleDecoratorOptions) {
  return function <T extends Constructor>(target: T) {
    const parent = getCurrentInjector();
    const injector = new Injector(parent, providers);

    const moduleMetadata: ModuleMetadata = {
      module: true,
      exports: retreiveExportTokens(exports),
      providers,
      injector,
      controllers,
      imports,
    };

    defineMetadata(moduleMetadata, target);
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
    assertIsModule(module, `Cannot import providers from ${module.name}`);
    const moduleMetadata = getModuleMetadata(module);

    moduleMetadata.exports.forEach((token) => {
      injector.provide({
        provide: token,
        useFactory() {
          return moduleMetadata.injector.get(token);
        },
      });
    });
  });

  imports.forEach((module) => new module());
}

function retreiveExportTokens(exports: DIToken[]): DIToken[] {
  const tokens: DIToken[] = [];

  exports.forEach((exportToken) => {
    const metadata = getModuleMetadata(exportToken);

    if (metadata.module) {
      tokens.push(...metadata.exports);
      return;
    }

    tokens.push(exportToken);
  });

  return tokens;
}
