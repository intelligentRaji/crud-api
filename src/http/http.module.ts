import { Module, type Provider, inject } from '@di';

import { HOST, PORT, RouteRegestry, Router } from './router';
import { DEFAULT_CONTENT_TYPE, Serializer } from './serializer';

const DEFAULT_PROVIDERS: Provider[] = [
  Router,
  RouteRegestry,
  Serializer,
  {
    provide: DEFAULT_CONTENT_TYPE,
    useValue: 'application/json',
  },
];

export interface HttpModueForRootOptions {
  host: string;
  port: number;
}

export class HttpModule {
  static forRoot({ host, port }: HttpModueForRootOptions) {
    return Module({
      providers: [
        ...DEFAULT_PROVIDERS,
        { provide: HOST, useValue: host },
        { provide: PORT, useValue: port },
      ],
      exports: [Router, RouteRegestry, Serializer, HOST, PORT],
    })(
      class HttpModuleForRoot {
        constructor() {
          inject(Router);
        }
      },
    );
  }
}
