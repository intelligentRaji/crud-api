import { InjectionToken } from '../injection-token';
import { type Constructor } from './constructor';

export type Provider<T = any> =
  | ValueProvider<T>
  | ClassProvider<T>
  | ExistingProvider<T>
  | FactoryProvider<T>;

export interface ValueProvider<T> {
  provide: InjectionToken<T> | Constructor<T>;
  useValue: T;
}

export interface ClassProvider<T> {
  provide: InjectionToken<T> | Constructor<T>;
  useClass: Constructor<T>;
}

export interface ExistingProvider<T> {
  provide: InjectionToken<T> | Constructor<T>;
  useExisting: InjectionToken<T> | Constructor<T>;
}

export interface FactoryProvider<T> extends FactoryOptions<T> {
  provide: InjectionToken<T> | Constructor<T>;
}

export interface FactoryOptions<T = any> {
  useFactory: () => T;
}
