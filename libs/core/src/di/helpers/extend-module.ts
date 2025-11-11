import { type Constructor } from '@repo/common';

import { Module, type ModuleDecoratorOptions } from '../decorators';
import { assertIsModule } from './asserts/assert-is-module';
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
