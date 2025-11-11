import { updateHandlerMetadata } from '@common';

import type { ContentTypeMap } from '../types';

export function ContentType(contentType: keyof ContentTypeMap) {
  return function (target: any, propertyKey: string) {
    updateHandlerMetadata(target, propertyKey, { serializeTo: contentType });
  };
}
