import { getMetadata } from './metadata';
import type { Constructor } from './types';

export class Application {
  static init(module: Constructor) {
    const metadata = getMetadata(module);

    if (!metadata.module) {
      throw new Error(`${module.name} is not a module, please use @Module decorator to init App`);
    }

    new module();
  }
}
