import type { ContentTypeMap } from '@content-type';
import type { Method } from '@router';

export interface HandlerMetadata {
  path: string;
  propertyKey: string;
  method: Method;
  serializeTo?: keyof ContentTypeMap;
  httpCode?: number;
}
