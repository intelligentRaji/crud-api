import type { Constructor } from '@repo/common';

import { assertIsModule, getCurrentInjector, getModuleMetadata, inject } from './di';
import { APP_INITIALIZER } from './tokens';

export class Application {
  static async init(module: Constructor) {
    assertIsModule(module, 'Please use @Module decorator to init Application');
    const rootInjector = getCurrentInjector();
    const metadata = getModuleMetadata(module);

    // @ts-ignore
    rootInjector.providers = metadata.injector.providers;

    await runAppInitializers();

    new module();
  }
}

async function runAppInitializers() {
  const initializers = inject<Function[]>(APP_INITIALIZER);

  for (const initializer of initializers) {
    await initializer();
  }
}
