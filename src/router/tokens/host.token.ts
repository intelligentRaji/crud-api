import { InjectionToken, inject } from '@di';

export const HOST = new InjectionToken<string>('HOST');

export function host() {
  return inject(HOST);
}
