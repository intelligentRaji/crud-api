import type { HandlerMeta } from '../classes';

export interface ControllerMetadata {
  controller: boolean;
  handlers: Record<string, HandlerMeta>;
}
