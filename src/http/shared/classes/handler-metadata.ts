import type { HandlerMetadata } from '../types';

export class HandlerMeta implements HandlerMetadata {
  private readonly _metadata: HandlerMetadata;

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

  constructor(
    metadata: HandlerMetadata = {
      path: '',
      propertyKey: '',
      method: 'GET',
    },
  ) {
    this._metadata = metadata;
  }

  public get<K extends keyof HandlerMetadata>(key: K): HandlerMetadata[K] {
    return this._metadata[key];
  }

  public set(updates: Partial<HandlerMetadata>): HandlerMeta {
    return new HandlerMeta({
      ...this._metadata,
      ...updates,
    });
  }

  public has(key: keyof HandlerMetadata): boolean {
    return key in this._metadata;
  }

  public toObject(): HandlerMetadata {
    return { ...this._metadata };
  }
}
