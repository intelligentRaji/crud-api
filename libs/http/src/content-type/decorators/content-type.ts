import { updateRouteMetadata } from '@router';
import type { ContentTypeMap } from '@shared';

export function ContentType(contentType: keyof ContentTypeMap) {
  return function (target: any, propertyKey: string) {
    updateRouteMetadata(target, propertyKey, { serializeTo: contentType });
  };
}
