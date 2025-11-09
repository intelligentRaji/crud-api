import type { HandlerMetadata } from './handler-metadata';

export type Middleware = (next: () => Promise<void>) => Promise<void> | void;

export interface MiddlewareContext {
  metadata: Readonly<HandlerMetadata>;
  body: any;
}
