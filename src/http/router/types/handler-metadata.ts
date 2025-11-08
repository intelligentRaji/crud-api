import type { Method } from './method';

export interface HandlerMetadata {
  path: string;
  propertyKey: string;
  method: Method;
  serializeTo?: string;
}
