import { IncomingMessage, ServerResponse, createServer } from 'node:http';

import { Injector, inject, runInInjectionContext } from '@di';
import { Serializer } from '@http/serializer';

import { RouteError } from './errors';
import { RouteRegestry } from './route-regestry.service';
import { HOST, PARAMS, PORT, REQ, RES } from './tokens';

export class Router {
  private readonly serializer = inject(Serializer);
  private readonly routeRegistry = inject(RouteRegestry);
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
      const result = await handler();
      this.processResponse(res, result);
    }, injector);
  }

  private processResponse(res: ServerResponse, result: unknown): void {
    if (result === undefined) {
      res.end();
      return;
    }

    const serialized = this.serializer.serialize(result);
    res.write(serialized);
    res.end();
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

    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        error: res.statusMessage,
      }),
    );
  }
}
