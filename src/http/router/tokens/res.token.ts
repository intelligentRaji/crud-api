import type { ServerResponse } from 'node:http';

import { InjectionToken, inject } from '@di';

export const RES = new InjectionToken<ServerResponse>('RES');

export function response() {
  return inject(RES);
}
