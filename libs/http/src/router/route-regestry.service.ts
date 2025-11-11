import type { IncomingMessage } from 'node:http';

import { NotFoundError } from '@http';
import { type HandlerMeta, getHandlersMetadata } from '@http/shared';

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
    const methodHandlers = this.handlers[req.method as Method];

    if (!methodHandlers) {
      return this.throwRouteNotFound(req);
    }

    let data: RouteData | undefined;

    for (const key in methodHandlers) {
      if (this.isUrlMatchesPattern(req.url ?? '', key)) {
        data = methodHandlers[key];
        break;
      }
    }

    if (!data) {
      return this.throwRouteNotFound(req);
    }

    return data;
  }

  private throwRouteNotFound(req: IncomingMessage): never {
    throw new NotFoundError(`Route with path ${req.method}:${req.url} not found`);
  }

  private isUrlMatchesPattern(url: string, pattern: string): boolean {
    const patternParts = pattern.split('/');
    const urlParts = url.split('/');

    return urlParts.every((part, index) =>
      this.isSegmentMatchesPattern(part, patternParts.at(index) ?? ''),
    );
  }

  private isSegmentMatchesPattern(segment: string, pattern: string): boolean {
    if (pattern.startsWith(':')) {
      return true;
    }

    return segment === pattern;
  }
}
