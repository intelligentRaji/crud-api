import { inject } from '../../di/inject';
import { InjectionToken } from '../../di/injection-token';

export const PARAMS = new InjectionToken<Record<string, string>>('PARAMS');

export function params() {
  return inject(PARAMS);
}
