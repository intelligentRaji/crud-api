import { InjectionToken, inject } from '@di';

export const PORT = new InjectionToken<number>('PORT');

export function port() {
  return inject(PORT);
}
