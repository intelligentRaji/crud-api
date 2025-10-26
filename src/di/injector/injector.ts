import { InjectionToken } from '../injection-token';
import { type Constructor } from '../types/constructor';
import {
  type ClassProvider,
  type FactoryProvider,
  type Provider,
  type ValueProvider,
} from '../types/provider';

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
  host?: boolean;
  optional?: boolean;
}

interface InjectionSelfOptions {
  self?: true;
  skipSelf?: false;
  host?: boolean;
  optional?: boolean;
}

export type InjectionOptions = InjectionSelfOptions | InjectionSkipSelfOptions;

export type InjectionOptionalOptions = InjectionOptions & { optional: true };

export class Injector {
  private readonly providers = new Map<string, ProviderData>();
  private readonly parent: Injector | null = null;

  constructor(parent: Injector | null = null, providers: Provider<any>[] = []) {
    this.parent = parent;
    providers.forEach((provider) => this.provide(provider));
    this.provide({ provide: Injector, useValue: this });
  }

  public get<T>(
    token: InjectionToken<T> | Constructor<T>,
    options: InjectionOptionalOptions,
  ): T | null;
  public get<T>(token: InjectionToken<T> | Constructor<T>, options?: InjectionOptions): T;
  public get<T>(
    token: InjectionToken<T> | Constructor<T>,
    options: InjectionOptions | InjectionOptionalOptions = {},
  ): T | null {
    let provider;

    if (!options.skipSelf) {
      provider = this.providers.get(token.name);
    }

    if (!provider) {
      if (this.parent && !options.self) {
        return this.parent.get(token, { optional: options.optional, self: options.host });
      }

      if (options.optional) {
        return null;
      }

      throw new Error(`Dependency ${token.name} is not registered`);
    }

    if (isProviderInitialized(provider)) {
      return provider.value;
    }

    const dependency = this.initializeProvider(provider);
    this.providers.set(token.name, { value: dependency });
    return dependency;
  }

  public provide<T>(provider: Provider<T>): void {
    this.providers.set(provider.provide.name, { provider });
  }

  private initializeProvider(providerData: UninitializedProvider): any {
    const { provider } = providerData;

    if ('useValue' in provider) {
      return resolveValueProvider(provider);
    }

    if ('useClass' in provider) {
      return resolveClassProvider(provider);
    }

    if ('useFactory' in provider) {
      return resolveFactoryProvider(provider);
    }

    if ('useExisting' in provider) {
      return this.get(provider.useExisting);
    }
  }
}

function isProviderInitialized(provider: ProviderData): provider is InitializedProvider {
  return 'value' in provider;
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
