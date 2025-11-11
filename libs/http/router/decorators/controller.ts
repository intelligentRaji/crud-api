import { type Constructor, defineMetadata, getMetadata } from 'libs/core';

import { inject } from '@di';

import { RouteRegestry } from '../route-regestry.service';
import type { ControllerMetadata } from '../types';

export function Controller(path: string) {
  return function <T extends Constructor>(target: T) {
    const prototype = target.prototype;
    const existingMetadata: ControllerMetadata = getMetadata(prototype);
    const handlers = existingMetadata.handlers || {};

    for (const key in handlers) {
      const handler = handlers[key];
      handlers[key] = handler.set({ path: `/${path}${handler.path}` });
    }

    defineMetadata(
      {
        ...existingMetadata,
        controller: true,
        handlers,
      },
      prototype,
    );

    return class extends target {
      constructor(...args: any[]) {
        super(...args);
        const router = inject(RouteRegestry);
        router.registerRoutes(this);
      }
    };
  };
}
