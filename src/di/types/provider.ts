import { type Constructor } from '@core';

import type { DIToken } from './token';

type FlattenProviders<T> = T extends Provider
  ? T
  : T extends (infer U)[]
    ? FlattenProviders<U>[]
    : never;

export type Providers<T = any> = FlattenProviders<T>[];

export type Provider =
  | Constructor
  | ValueProvider
  | ClassProvider
  | ExistingProvider
  | FactoryProvider;

export interface ValueProvider extends MultiProvider {
  provide: DIToken;
  useValue: any;
}

export interface ClassProvider extends MultiProvider {
  provide: DIToken;
  useClass: Constructor;
}

export interface ExistingProvider extends MultiProvider {
  provide: DIToken;
  useExisting: DIToken;
}

export interface FactoryProvider extends MultiProvider {
  provide: DIToken;
  useFactory: () => any;
}

export interface MultiProvider {
  multi?: boolean;
}
