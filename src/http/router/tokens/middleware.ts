import { InjectionToken, type Provider } from '@di';

import type { Middleware } from '../types';

export const MIDDLEWARE = new InjectionToken<Middleware[]>('MIDDLEWARE');

export function provideMiddlewares(middlewares: Middleware[]): Provider[] {
  return middlewares.map((middleware) => ({
    provide: MIDDLEWARE,
    useValue: middleware,
    multi: true,
  }));
}
