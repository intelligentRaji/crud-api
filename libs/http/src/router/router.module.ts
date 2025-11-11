import { APP_INITIALIZER, extendModule, inject, Module, provideAppInitializers } from "@repo/core"; 

import { Router } from "./router";
import { RouteRegestry } from "./route-regestry.service";
import { DEFAULT_HTTP_CODE, HOST, MIDDLEWARE, PORT, provideMiddlewares } from "./tokens";
import { HttpCodeMiddleware } from "./middlewares";

export interface RouterModuleForRootOptions {
  host: string;
  port: number;
}

@Module({
  providers: [
    Router, 
    RouteRegestry,
    {
      provide: DEFAULT_HTTP_CODE,
      useValue: 200,
    },
    provideMiddlewares([
      HttpCodeMiddleware,
    ]),
    provideAppInitializers([
      initializeRouter,
    ])
  ],
  exports: [Router, RouteRegestry, APP_INITIALIZER, DEFAULT_HTTP_CODE, MIDDLEWARE],
})
export class RouterModule {
  static forRoot({ host, port }: RouterModuleForRootOptions) {
    return extendModule(RouterModule, {
      providers: [
        { provide: HOST, useValue: host },
        { provide: PORT, useValue: port },
      ],
      exports: [HOST, PORT],
    });
  }
}

function initializeRouter() {
  inject(Router);
}
