import type { ServerResponse } from 'node:http';

import { InjectionToken, inject } from '@di';

export const RESPONSE = new InjectionToken<ServerResponse>('RESPONSE');

export function response() {
  return inject(RESPONSE);
}
