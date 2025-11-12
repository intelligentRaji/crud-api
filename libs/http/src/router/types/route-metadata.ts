import type { ContentTypeMap, Method } from '@shared';

export interface RouteMetadata {
  path: string;
  propertyKey: string;
  method: Method;
  serializeTo?: keyof ContentTypeMap;
  httpCode?: number;
}
