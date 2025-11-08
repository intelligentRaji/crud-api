import type { IncomingMessage } from 'http';

import type { HandlerMeta } from './classes';
import { NotFoundError } from './errors';
import { getHandlersMetadata } from './helpers';
import type { Method } from './types';

export type RouteData = {
  handler: () => any;
  metadata: HandlerMeta;
};

type HandlerRegestry = Partial<Record<Method, Record<string, RouteData>>>;

export class RouteRegestry {
  private readonly handlers: HandlerRegestry = {};

  public registerRoutes(controller: any): void {
    const handlers = getHandlersMetadata(controller);

    for (const handler of Object.values(handlers)) {
      this.registerHandler(handler, controller);
    }
  }

  private registerHandler(handler: HandlerMeta, controller: any): void {
    const { path, method, propertyKey } = handler;

    const methodHandlers = this.handlers[method] ?? {};

    methodHandlers[path] = {
      metadata: handler,
      handler: controller[propertyKey].bind(controller),
    };

    this.handlers[method] = methodHandlers;
  }

  public findRoute(req: IncomingMessage): RouteData {
    const method = this.handlers[req.method as Method];

    if (!method) {
      return this.throwRouteNotFound(req);
    }

    const route = method[req.url ?? ''];

    if (!route) {
      return this.throwRouteNotFound(req);
    }

    return route;
  }

  private throwRouteNotFound(req: IncomingMessage): never {
    throw new NotFoundError(`Route with path ${req.method}:${req.url} not found`);
  }
}
