export interface HandlerMetadata {
  path?: string;
  propertyKey?: string;
  method?: string;
  serializeTo?: string;
}

export class HandlerMeta implements HandlerMetadata {
  private readonly _metadata: HandlerMetadata;

  public get path(): string | undefined {
    return this._metadata.path;
  }
  public get propertyKey(): string | undefined {
    return this._metadata.propertyKey;
  }
  public get method(): string | undefined {
    return this._metadata.method;
  }
  public get serializeTo(): string | undefined {
    return this._metadata.serializeTo;
  }

  constructor(metadata: HandlerMetadata = {}) {
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
