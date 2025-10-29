import { getCurrentInjector } from '../di/context';
import { Serializer } from '../serializing/serializer.service';
import { Router } from '../routing/router';
import { HOST, PORT } from '../routing/tokens';
import type { Constructor } from './types/constructor';
import { provideSerializer } from '../serializing/provide-serializer';

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
