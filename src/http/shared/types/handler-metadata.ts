import type { Method } from '@http/router';
import type { ContentTypeMap } from '@http/serializer';

export interface HandlerMetadata {
  path: string;
  propertyKey: string;
  method: Method;
  serializeTo?: keyof ContentTypeMap;
}
