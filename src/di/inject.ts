import { type Constructor } from '@core';

import { getCurrentInjector } from './context';
import { InjectionToken } from './injection-token';
import { type InjectionOptionalOptions, type InjectionOptions } from './injector';

export function inject<T>(
  traget: InjectionToken<T> | Constructor<T>,
  options: InjectionOptionalOptions,
): T | null;
export function inject<T>(
  traget: InjectionToken<T> | Constructor<T>,
  options?: InjectionOptions,
): T;
export function inject<T>(
  target: InjectionToken<T> | Constructor<T>,
  options: InjectionOptions | InjectionOptionalOptions = {},
): T | null {
  const injector = getCurrentInjector();

  return injector.get(target, options);
}
