import { IncomingMessage, ServerResponse, createServer } from 'node:http';

import type { Constructor } from '@core';
import { Injector, getCurrentInjector, inject, setCurrentInjector } from '@di';
import { Serializer } from '@serializer';

import type { HandlerMeta } from './classes';
import { HOST, PARAMS, PORT, REQ, RES } from './tokens';

export class Router {
  private readonly serializer = inject(Serializer);
  private readonly host = inject(HOST);
  private readonly port = inject(PORT);

  private readonly server = createServer();

  constructor() {
    this.server.listen(this.port, this.host);
  }

  public registerController(controller: any, constructor: Constructor): void {
    const basePath = Reflect.getMetadata('basePath', constructor) as string;
    const handlers = Reflect.getMetadata('handlers', controller) as HandlerMeta[];

    this.server.on('request', async (req, res) => {
      for (const handler of Object.values(handlers)) {
        if (isRequestMatchesHandler(req, handler, basePath)) {
          await this.handleRequest(req, res, basePath, handler, controller);
          break;
        }
      }
    });
  }

  private async handleRequest(
    req: IncomingMessage,
    res: ServerResponse,
    basePath: string,
    metadata: HandlerMeta,
    controller: any,
  ) {
    const parent = getCurrentInjector();
    const injector = new Injector(parent, [
      {
        provide: REQ,
        useValue: req,
      },
      {
        provide: RES,
        useValue: res,
      },
      {
        provide: PARAMS,
        useValue: mapRouteParams(`${basePath}${metadata.path ?? ''}`, req?.url || ''),
      },
    ]);

    const propertyKey = metadata.propertyKey;

    if (!propertyKey) {
      throw new Error('Use method decorators to define handler');
    }

    const handler = controller[propertyKey].bind(controller);

    setCurrentInjector(injector);
    this.processRequest(res, await handler());
    setCurrentInjector(parent);
  }

  private processRequest(res: ServerResponse, result: unknown): void {
    if (result === undefined) {
      res.end();
      return;
    }

    const serialized = this.serializer.serialize(result);

    res.write(serialized);
    res.end();
  }
}

function mapRouteParams(pattern: string, actualPath: string): Record<string, string> {
  const patternParts = pattern.split('/');
  const actualParts = actualPath.split('/');

  const result: Record<string, string> = {};

  patternParts.forEach((part, index) => {
    if (part.startsWith(':')) {
      const key = part.slice(1);
      result[key] = actualParts[index];
    }
  });

  return result;
}

function isRequestMatchesHandler(
  req: IncomingMessage,
  handler: HandlerMeta,
  basePath: string,
): boolean {
  const pattern = `${basePath}${handler.path}`;
  const { url, method } = req;

  if (!url) {
    return false;
  }

  return isRequestUrlMatchesPattern(url, pattern) && method === handler.method;
}

function isRequestUrlMatchesPattern(url: string, pattern: string): boolean {
  const patternParts = pattern.split('/');
  const urlParts = url.split('/');

  return urlParts.every((part, index) =>
    isSegmentMatchesPattern(part, patternParts.at(index) ?? ''),
  );
}

function isSegmentMatchesPattern(segment: string, pattern: string): boolean {
  if (pattern.startsWith(':')) {
    return true;
  }

  return segment === pattern;
}
