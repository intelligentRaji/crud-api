import { InjectionToken, inject } from '@repo/core';

export const HOST = new InjectionToken<string>('HOST');

export function host() {
  return inject(HOST);
}
