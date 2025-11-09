import { assertIsModule } from '@di';

import type { Constructor } from './types';

export class Application {
  static init(module: Constructor) {
    assertIsModule(module, 'Please use @Module decorator to init App');

    new module();
  }
}
