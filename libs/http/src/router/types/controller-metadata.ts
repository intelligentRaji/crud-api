import type { RouteMeta } from '../classes';

export interface ControllerMetadata {
  controller: boolean;
  handlers: Record<string, RouteMeta>;
}
