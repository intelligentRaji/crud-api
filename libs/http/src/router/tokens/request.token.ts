import type { IncomingMessage } from 'node:http';

import { InjectionToken, inject } from '@repo/core';

export const REQUEST = new InjectionToken<IncomingMessage>('REQUEST');

export function request() {
  return inject(REQUEST);
}
