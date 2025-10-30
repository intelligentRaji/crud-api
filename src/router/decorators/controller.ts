import type { Constructor } from '../../core';
import { inject } from '../../di';
import { Router } from '../router';

export function Controller(path: string) {
  return function <T extends Constructor>(target: T) {
    Reflect.defineMetadata('controller', true, target);
    Reflect.defineMetadata('basePath', `/${path}`, target);

    return class extends target {
      constructor(...args: any[]) {
        super(...args);
        const router = inject(Router);
        router.registerController(this, target);
      }
    };
  };
}
