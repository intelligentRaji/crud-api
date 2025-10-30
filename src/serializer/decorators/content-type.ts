import { HandlerMeta } from '@router';

import type { ContentTypeMap } from '../types';

export function ContentType(contentType: keyof ContentTypeMap) {
  return function (target: any, propertyKey: string) {
    HandlerMeta.updateOn(target, propertyKey, { serializeTo: contentType });
  };
}
