import { IncomingMessage, ServerResponse, createServer } from 'node:http';

import { Injector, inject, runInInjectionContext } from '@di';

import { RouteError } from './errors';
import { RouteRegestry } from './route-regestry.service';
import { HOST, MIDDLEWARE_CONTEXT, PARAMS, PORT, REQ, RES, RESPONSE_MIDDLEWARES } from './tokens';
import type { Middleware } from './types/middleware';

export class Router {
  private readonly routeRegistry = inject(RouteRegestry);
  private readonly responseMiddlewares = inject<Middleware[]>(RESPONSE_MIDDLEWARES);
  private readonly host = inject(HOST);
  private readonly port = inject(PORT);

  private readonly server = createServer();

  constructor() {
    this.setupRequestHandler();
    this.startServer();
  }

  private startServer(): void {
    this.server.listen(this.port, this.host, () => {
      console.log(`Server running at http://${this.host}:${this.port}`);
    });
  }

  private async setupRequestHandler(): Promise<void> {
    this.server.on('request', async (req, res) => {
      try {
        await this.handleRequest(req, res);
      } catch (error: unknown) {
        this.handleError(error, res);
      }
    });
  }

  private async handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const route = this.routeRegistry.findRoute(req);
    const { handler, metadata } = route;

    const parent = inject(Injector);
    const injector = new Injector(parent, [
      { provide: REQ, useValue: req },
      { provide: RES, useValue: res },
      { provide: PARAMS, useValue: this.mapRouteParams(metadata.path, req.url || '') },
    ]);

    await runInInjectionContext(async () => {
      const body = await handler();

      inject(Injector).provide({
        provide: MIDDLEWARE_CONTEXT,
        useValue: { body, metadata },
      });

      await this.processResponse(res);
    }, injector);
  }

  private async processResponse(res: ServerResponse): Promise<void> {
    await this.runMiddlewares(this.responseMiddlewares);

    const { body } = inject(MIDDLEWARE_CONTEXT);

    res.write(body);
    res.end();
  }

  private handleError(error: RouteError | unknown, res: ServerResponse): void {
    console.error('Request error:', error);

    let routeError: RouteError;

    if (!(error instanceof RouteError)) {
      routeError = new RouteError({ message: 'Internal Server Error', statusCode: 500 });
    } else {
      routeError = error;
    }

    const { statusCode, statusMessage } = routeError.toResponse();
    res.statusCode = statusCode;
    res.statusMessage = statusMessage;

    res.end(
      JSON.stringify({
        error: res.statusMessage,
      }),
    );
  }

  private mapRouteParams(pattern: string, actualPath: string): Record<string, string> {
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

  private async runMiddlewares(middlewares: Middleware[]): Promise<void> {
    let index = -1;

    const next = async () => {
      index++;

      const middleware = middlewares[index];

      if (middleware) {
        await middleware(next);
      }
    };

    await next();
  }
}
