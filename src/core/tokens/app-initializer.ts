import { InjectionToken } from '@di';

export const APP_INITIALIZER = new InjectionToken('APP_INITIALIZER');

export function provideAppInitializer(fn: () => void | Promise<void>) {
  return {
    provide: APP_INITIALIZER,
    useValue: fn,
    multi: true,
  };
}
