import { InjectionToken } from '../../di/injection-token';
import { inject } from '../../di/inject';

export const HOST = new InjectionToken<string>('HOST');

export function host() {
  return inject(HOST);
}
