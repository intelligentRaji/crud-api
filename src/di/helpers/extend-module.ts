import { Module, type ModuleDecoratorOptions } from 'di/decorators';
import { assertIsModule } from 'di/errors';

import { type Constructor } from '@core';

import { getModuleMetadata } from './get-module-metadata';

export function extendModule(module: Constructor, options: ModuleDecoratorOptions) {
  assertIsModule(module, `Cannot extend ${module.name}`);
  const metadata = getModuleMetadata(module);

  return Module({
    providers: [...metadata.providers, ...(options.providers || [])],
    exports: [...metadata.exports, ...(options.exports || [])],
    imports: [...metadata.imports, ...(options.imports || [])],
    controllers: [...metadata.controllers, ...(options.controllers || [])],
  })(module);
}
