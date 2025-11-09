import { Module, extendModule, inject } from '@di';

import { HOST, PORT, RouteRegestry, Router } from './router';
import { SerializerModule } from './serializer';

export interface HttpModuleForRootOptions {
  host: string;
  port: number;
}

@Module({
  providers: [Router, RouteRegestry],
  imports: [SerializerModule],
  exports: [Router, RouteRegestry, SerializerModule],
})
export class HttpModule {
  static forRoot({ host, port }: HttpModuleForRootOptions) {
    return extendModule(HttpModule, {
      providers: [
        { provide: HOST, useValue: host },
        { provide: PORT, useValue: port },
      ],
      exports: [HOST, PORT],
    });
  }

  constructor() {
    // Instantiates router
    inject(Router);
  }
}
