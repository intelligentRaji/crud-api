import { InjectionToken, inject } from '@repo/core';

export const PORT = new InjectionToken<number>('PORT');

export function port() {
  return inject(PORT);
}
