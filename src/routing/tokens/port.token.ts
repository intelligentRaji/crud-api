import { InjectionToken } from '../../di/injection-token';
import { inject } from '../../di/inject';

export const PORT = new InjectionToken<number>('PORT');

export function port() {
  return inject(PORT);
}
