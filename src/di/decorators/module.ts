import { type Constructor, MetadataError, defineMetadata } from '@core';

import { getCurrentInjector, setCurrentInjector } from '../context';
import { assertIsModule } from '../errors';
import { getModuleMetadata } from '../helpers';
import { Injector } from '../injector';
import { type ModuleMetadata, type Provider } from '../types';
import type { DIToken } from '../types/token';

export type ModuleDecoratorOptions = Partial<Omit<ModuleMetadata, 'module' | 'injector' | 'name'>>;

export function Module({
  providers = [],
  controllers = [],
  imports = [],
  exports = [],
}: ModuleDecoratorOptions = {}) {
  return function <T extends Constructor>(target: T) {
    checkProvidersOnModules(providers);

    const parent = getCurrentInjector();
    const injector = new Injector(parent);

    const moduleMetadata: ModuleMetadata = {
      module: true,
      injector,
      name: target.name,
      exports: retreiveExportTokens(exports),
      providers,
      controllers,
      imports,
    };

    defineMetadata(moduleMetadata, target);
    importModules(injector, imports);
    injector.provide(...providers);

    return class extends target {
      constructor(...args: any[]) {
        setCurrentInjector(injector);
        super(...args);
        imports.forEach((module) => new module());
        controllers.forEach((controller) => new controller());
        setCurrentInjector(parent);
      }
    };
  };
}

function importModules(injector: Injector, imports: Constructor[]): void {
  imports.forEach((module) => {
    assertIsModule(module, `"imports" accepts only modules`);
    const moduleMetadata = getModuleMetadata(module);

    moduleMetadata.exports.forEach((token) => {
      injector.provide({
        provide: token,
        useFactory() {
          return moduleMetadata.injector.get();
        },
      });
    });
  });
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

function checkProvidersOnModules(providers: Provider[]) {
  providers.forEach((provider) => {
    const metadata = getModuleMetadata(provider);

    if (metadata.module) {
      throw new MetadataError(
        `Cannot provide module "${metadata.name}", please put it in "imports" array instead of "providers"`,
      );
    }
  });
}
