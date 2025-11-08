import { type Constructor } from '@core';

import { InjectionToken } from '../injection-token';

export type Provider<T = any> =
  | Constructor<T>
  | ValueProvider<T>
  | ClassProvider<T>
  | ExistingProvider<T>
  | FactoryProvider<T>;

export interface ValueProvider<T> {
  provide: InjectionToken<T>;
  useValue: T;
}

export interface ClassProvider<T> {
  provide: InjectionToken<T>;
  useClass: Constructor<T>;
}

export interface ExistingProvider<T> {
  provide: InjectionToken<T>;
  useExisting: InjectionToken<T>;
}

export interface FactoryProvider<T> extends FactoryOptions<T> {
  provide: InjectionToken<T>;
}

export interface FactoryOptions<T = any> {
  useFactory: () => T;
}
