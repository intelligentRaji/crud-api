import { inject } from '../di/inject';
import { DEFAULT_CONTENT_TYPE } from './tokens/default-content-type.token';
import type { ContentType, ContentTypeMap } from './types/conten-type-map';

export class Serializer {
  private readonly defaultContentType = inject(DEFAULT_CONTENT_TYPE);

  private readonly serializers: Record<
    ContentType,
    (data: unknown) => ContentTypeMap[ContentType]
  > = {
    'application/json': (data: unknown) => JSON.stringify(data),
  };

  public serialize<T extends ContentType>(data: any, contentType?: T): ContentTypeMap[T] {
    const serializer = this.serializers[contentType || this.defaultContentType];
    return serializer(data);
  }
}
