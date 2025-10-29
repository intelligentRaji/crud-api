export type ContentTypeMap = {
  'application/json': string;
};

export type ContentType = keyof ContentTypeMap;

const DEFAULT_CONTENT_TYPE: ContentType = 'application/json';

export class Serializer {
  private readonly serializers: Record<
    ContentType,
    (data: unknown) => ContentTypeMap[ContentType]
  > = {
    'application/json': (data: unknown) => JSON.stringify(data),
  };

  public serialize<T extends ContentType>(data: any, contentType?: T): ContentTypeMap[T] {
    const serializer = this.serializers[contentType || DEFAULT_CONTENT_TYPE];
    return serializer(data);
  }
}
