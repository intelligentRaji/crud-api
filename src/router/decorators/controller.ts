import type { Constructor } from '@core';
import { inject } from '@di';
import { Router } from '@router';

export function Controller(path: string) {
  return function <T extends Constructor>(target: T) {
    Reflect.defineMetadata('controller', true, target);

    const handlers = Reflect.getMetadata('handlers', target.prototype);

    for (let key in handlers) {
      const handler = handlers[key];
      handlers[key] = handler.set({ path: `/${path}${handler.path}` });
    }

    return class extends target {
      constructor(...args: any[]) {
        super(...args);
        const router = inject(Router);
        router.registerController(this);
      }
    };
  };
}
