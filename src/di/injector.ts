import { type Constructor } from '@core';

import { DIError } from './errors';
import {
  type ClassProvider,
  type FactoryProvider,
  type Provider,
  type Providers,
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

  constructor(parent: Injector | null = null, providers: Providers = []) {
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

  public provide(...providers: Providers): void {
    providers.flat(Infinity).forEach((p) => {
      let provider = transformToProvider(p);

      if (provider.multi) {
        let existing = this.get(provider.provide, { optional: true }, false);

        if (Array.isArray(existing)) {
          existing.push({ provider });
        } else {
          const providers: ProviderData[] = [{ provider }];

          if (existing) {
            providers.push(existing);
          }

          this.providers.set(provider.provide.name, providers);
        }

        return;
      }

      this.providers.set(provider.provide.name, { provider });
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

function resolveValueProvider(provider: ValueProvider): any {
  return provider.useValue;
}

function resolveClassProvider(provider: ClassProvider): any {
  return new provider.useClass();
}

function resolveFactoryProvider(provider: FactoryProvider): any {
  const { useFactory } = provider;

  return useFactory();
}

function isProviderInitialized(provider: ProviderData): provider is InitializedProvider {
  return 'value' in provider;
}

function transformToProvider(provider: Provider | Constructor): Exclude<Provider, Constructor> {
  if (isProviderConstructor(provider)) {
    return createClassProviderFromConstructor(provider);
  }

  return provider;
}

function isProviderConstructor(target: Provider): target is Constructor {
  return typeof target === 'function';
}

function createClassProviderFromConstructor(target: Constructor): ClassProvider {
  return {
    provide: target,
    useClass: target,
  };
}
