import { InjectionToken, inject } from '@di';

import type { MiddlewareContext } from '../types/middleware';

export const RESPONSE_MIDDLEWARES = new InjectionToken('RESPONSE_MIDDLEWARES');
export const REQUEST_MIDDLEWARES = new InjectionToken('REQUEST_MIDDLEWARES');

export const MIDDLEWARE_CONTEXT = new InjectionToken<MiddlewareContext>('MIDDLEWARE_CONTEXT');

export function context(): MiddlewareContext {
  return inject(MIDDLEWARE_CONTEXT);
}
