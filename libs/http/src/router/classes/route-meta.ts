import type { RouteMetadata } from '../types';

export class RouteMeta implements RouteMetadata {
  private readonly _metadata: RouteMetadata;

  public get path() {
    return this._metadata.path;
  }
  public get propertyKey() {
    return this._metadata.propertyKey;
  }
  public get method() {
    return this._metadata.method;
  }
  public get serializeTo() {
    return this._metadata.serializeTo;
  }
  public get httpCode() {
    return this._metadata.httpCode;
  }

  constructor(
    metadata: RouteMetadata = {
      path: '',
      propertyKey: '',
      method: 'GET',
    },
  ) {
    this._metadata = metadata;
  }

  public get<K extends keyof RouteMetadata>(key: K): RouteMetadata[K] {
    return this._metadata[key];
  }

  public set(updates: Partial<RouteMetadata>): RouteMeta {
    return new RouteMeta({
      ...this._metadata,
      ...updates,
    });
  }

  public has(key: keyof RouteMetadata): boolean {
    return key in this._metadata;
  }

  public toObject(): RouteMetadata {
    return { ...this._metadata };
  }
}
