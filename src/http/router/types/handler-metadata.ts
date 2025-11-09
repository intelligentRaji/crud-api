import type { ContentTypeMap } from '@http/serializer';

import type { Method } from './method';

export interface HandlerMetadata {
  path: string;
  propertyKey: string;
  method: Method;
  serializeTo?: keyof ContentTypeMap;
}
