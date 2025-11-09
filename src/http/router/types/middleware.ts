import type { HandlerMetadata } from '@http/shared';

export type Middleware = (next: () => Promise<void>) => Promise<void> | void;

export interface MiddlewareContext {
  metadata: Readonly<HandlerMetadata>;
  body: any;
}
