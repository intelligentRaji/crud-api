import { inject } from '@repo/core';

import type { ContentTypeMap } from '@shared';

import { DEFAULT_CONTENT_TYPE } from './tokens';

export class Serializer {
  private readonly defaultContentType = inject(DEFAULT_CONTENT_TYPE);

  private readonly serializers: Record<
    keyof ContentTypeMap,
    (data: unknown) => ContentTypeMap[keyof ContentTypeMap]
  > = {
    'application/json': (data: unknown) => JSON.stringify(data),
  };

  public serialize<K extends keyof ContentTypeMap>(
    data: unknown,
    contentType?: K,
  ): ContentTypeMap[K] {
    const serializer = this.serializers[contentType || this.defaultContentType];
    return serializer(data);
  }
}
