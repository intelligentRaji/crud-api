import { getCurrentInjector, setCurrentInjector } from '../di/context';
import { inject } from '../di/inject';
import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { Injector } from '../di/injector/injector';
import type { HandlerMetadata } from './decorators/handler';
import { HOST, PARAMS, PORT, REQ, RES } from './tokens';
import type { Constructor } from '../core/types/constructor';

const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 3000;

export class Router {
  private readonly host = inject(HOST, { optional: true }) || DEFAULT_HOST;
  private readonly port = inject(PORT, { optional: true }) || DEFAULT_PORT;

  private readonly server = createServer();

  constructor() {
    this.server.listen(this.port, this.host);
  }

  public registerController(controller: any, constructor: Constructor): void {
    const basePath = Reflect.getMetadata('basePath', constructor) as string;
    const handlers = Reflect.getMetadata('handlers', controller) as HandlerMetadata[];

    this.server.on('request', async (req, res) => {
      for (const handler of handlers) {
        await handleRequest(req, res, basePath, handler, controller);
      }
    });
  }
}

async function handleRequest(
  req: IncomingMessage,
  res: ServerResponse,
  basePath: string,
  metadata: HandlerMetadata,
  controller: any,
) {
  if (!isRequestMatchesHandler(req, metadata, basePath)) {
    return;
  }

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
      useValue: mapRouteParams(basePath, req?.url || ''),
    },
  ]);

  const handler = controller[metadata.propertyKey].bind(controller);

  setCurrentInjector(injector);
  await handler();
  setCurrentInjector(parent);
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
  handler: HandlerMetadata,
  basePath: string,
): boolean {
  return req.url === `${basePath}${handler.path}` && req.method === handler.method;
}
