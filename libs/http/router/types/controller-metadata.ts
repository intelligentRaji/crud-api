import type { HandlerMeta } from '@http/shared';

export interface ControllerMetadata {
  controller: boolean;
  handlers: Record<string, HandlerMeta>;
}
