import { type Constructor } from '@core';

import type { DIToken } from './token';

export type Provider<T = any> =
  | Constructor<T>
  | ValueProvider<T>
  | ClassProvider<T>
  | ExistingProvider<T>
  | FactoryProvider<T>;

export interface ValueProvider<T = any> extends MultiProvider {
  provide: DIToken<T>;
  useValue: T;
}

export interface ClassProvider<T = any> extends MultiProvider {
  provide: DIToken<T>;
  useClass: Constructor<T>;
}

export interface ExistingProvider<T = any> extends MultiProvider {
  provide: DIToken<T>;
  useExisting: DIToken<T>;
}

export interface FactoryProvider<T = any> extends MultiProvider {
  provide: DIToken<T>;
  useFactory: () => T;
}

export interface MultiProvider {
  multi?: boolean;
}
