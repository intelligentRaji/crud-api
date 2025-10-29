import { InjectionToken } from '../../di/injection-token';
import type { ServerResponse } from 'node:http';
import { inject } from '../../di/inject';

export const RES = new InjectionToken<ServerResponse>('RES');

export function res() {
  return inject(RES);
}
