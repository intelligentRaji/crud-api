import type { IncomingMessage } from 'node:http';

import { InjectionToken, inject } from '@di';

export const REQ = new InjectionToken<IncomingMessage>('REQ');

export function req() {
  return inject(REQ);
}
