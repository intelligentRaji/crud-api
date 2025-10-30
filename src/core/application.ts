import { getCurrentInjector } from '@di';
import { HOST, PORT, Router } from '@router';
import { Serializer, provideSerializer } from '@serializer';

import type { Constructor } from './types';

export interface ApplicationInitOptions {
  host: string;
  port: number;
}

export class Application {
  static init(module: Constructor, { host, port }: ApplicationInitOptions) {
    const isModule = Reflect.getMetadata('module', module);

    if (!isModule) {
      throw new Error(`${module.name} is not a module, please use @Module decorator to init App`);
    }

    const injector = getCurrentInjector();
    injector.provide(
      ...provideSerializer({
        serializer: Serializer,
        defaultContentType: 'application/json',
      }),
      {
        provide: Router,
        useClass: Router,
      },
      {
        provide: HOST,
        useValue: host,
      },
      {
        provide: PORT,
        useValue: port,
      },
    );

    new module();
  }
}
