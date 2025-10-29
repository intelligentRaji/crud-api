import { getCurrentInjector } from '../di/context';
import { Serializer } from '../routing/content-type.service';
import { Router } from '../routing/router';
import { HOST, PORT } from '../routing/tokens';
import type { Constructor } from './types/constructor';

const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 3000;

export interface ApplicationInitOptions {
  host?: string;
  port?: number;
}

export class Application {
  static init(
    module: Constructor,
    { host = DEFAULT_HOST, port = DEFAULT_PORT }: ApplicationInitOptions = {},
  ) {
    const isModule = Reflect.getMetadata('module', module);

    if (!isModule) {
      throw new Error(`${module.name} is not a module, please use @Module decorator to init App`);
    }

    const injector = getCurrentInjector();
    injector.provide(
      {
        provide: Router,
        useClass: Router,
      },
      {
        provide: Serializer,
        useClass: Serializer,
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
