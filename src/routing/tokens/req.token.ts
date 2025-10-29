import type { IncomingMessage } from 'node:http';
import { InjectionToken } from '../../di/injection-token';
import { inject } from '../../di/inject';

export const REQ = new InjectionToken<IncomingMessage>('REQ');

export function req() {
  return inject(REQ);
}
