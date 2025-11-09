import { type Constructor } from '@core';

import { DIError } from './errors';
import {
  type ClassProvider,
  type FactoryProvider,
  type Provider,
  type ValueProvider,
} from './types';
import type { DIToken } from './types/token';

type UninitializedProvider = {
  provider: Provider;
};

type InitializedProvider = {
  value: any;
};

type ProviderData = UninitializedProvider | InitializedProvider;

interface InjectionSkipSelfOptions {
  self?: false;
  skipSelf?: true;
  optional?: boolean;
}

interface InjectionSelfOptions {
  self?: true;
  skipSelf?: false;
  optional?: boolean;
}

export type InjectionOptions = InjectionSelfOptions | InjectionSkipSelfOptions;

export type InjectionOptionalOptions = InjectionOptions & { optional: true };

export class Injector {
  private readonly providers = new Map<string, ProviderData | ProviderData[]>();
  private readonly parent: Injector | null = null;

  constructor(parent: Injector | null = null, providers: Provider<any>[] = []) {
    this.parent = parent;
    this.provide(...providers, { provide: Injector, useValue: this });
  }

  public get<T = any>(token: DIToken, options: InjectionOptionalOptions, resolve?: true): T | null;
  public get<T = any>(token: DIToken, options?: InjectionOptions, resolve?: true): T;
  public get<T = any>(
    token: DIToken,
    options?: InjectionOptions | InjectionOptionalOptions,
    resolve?: false,
  ): ProviderData | ProviderData[];
  public get<T = any>(
    token: DIToken,
    options: InjectionOptions | InjectionOptionalOptions = {},
    resolve = true,
  ): T | null | ProviderData | ProviderData[] {
    let provider;

    if (!options.skipSelf) {
      provider = this.providers.get(token.name);
    }

    if (!provider) {
      if (this.parent && !options.self) {
        return this.parent.get(token, { optional: options.optional });
      }

      if (options.optional) {
        return null;
      }

      throw new DIError(`Dependency ${token.name} is not registered`);
    }

    if (!resolve) {
      return provider;
    }

    if (Array.isArray(provider)) {
      return provider.map((p) => this.retreiveProviderValue(p, token)) as T;
    }

    return this.retreiveProviderValue(provider, token);
  }

  public provide(...providers: Provider[]): void {
    providers.forEach((provider) => {
      let dependency = transformProvider(provider);

      if (dependency.multi) {
        let existing = this.get(dependency.provide, { optional: true }, false);

        if (Array.isArray(existing)) {
          existing.push({ provider: dependency });
        } else {
          const providers: ProviderData[] = [{ provider: dependency }];

          if (existing) {
            providers.push(existing);
          }

          this.providers.set(dependency.provide.name, providers);
        }

        return;
      }

      this.providers.set(dependency.provide.name, { provider: dependency });
    });
  }

  private retreiveProviderValue(providerData: ProviderData, token: DIToken): any {
    if (isProviderInitialized(providerData)) {
      return providerData.value;
    }

    const { provider } = providerData;

    let value;

    if ('useValue' in provider) {
      value = resolveValueProvider(provider);
    }

    if ('useClass' in provider) {
      value = resolveClassProvider(provider);
    }

    if ('useFactory' in provider) {
      value = resolveFactoryProvider(provider);
    }

    if ('useExisting' in provider) {
      value = this.get(provider.useExisting);
    }

    this.providers.set(token.name, { value });

    return value;
  }
}

function resolveValueProvider<T>(provider: ValueProvider<T>): T {
  return provider.useValue;
}

function resolveClassProvider<T>(provider: ClassProvider<T>): T {
  return new provider.useClass();
}

function resolveFactoryProvider<T>(provider: FactoryProvider<T>): T {
  const { useFactory } = provider;

  return useFactory();
}

function isProviderInitialized(provider: ProviderData): provider is InitializedProvider {
  return 'value' in provider;
}

function transformProvider<T>(
  provider: Provider<T> | Constructor<T>,
): Exclude<Provider<T>, Constructor<T>> {
  if (isProviderConstructor(provider)) {
    return createClassProviderFromConstructor(provider);
  }

  return provider;
}

function isProviderConstructor<T>(target: Provider<T> | Constructor<T>): target is Constructor<T> {
  return typeof target === 'function';
}

function createClassProviderFromConstructor<T>(target: Constructor<T>): ClassProvider<T> {
  return {
    provide: target,
    useClass: target,
  };
}
