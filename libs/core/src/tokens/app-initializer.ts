import { InjectionToken, type ValueProvider } from '../di';

export const APP_INITIALIZER = new InjectionToken('APP_INITIALIZER');

export function provideAppInitializers(
  initializers: Array<() => void | Promise<void>>,
): ValueProvider[] {
  return initializers.map((initializer) => ({
    provide: APP_INITIALIZER,
    useValue: initializer,
    multi: true,
  }));
}
