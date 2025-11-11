import type { HandlerMeta } from '@common';

export interface ControllerMetadata {
  controller: boolean;
  handlers: Record<string, HandlerMeta>;
}
