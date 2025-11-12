import { APP_INITIALIZER, extendModule, inject, Module, provideAppInitializers } from "@repo/core"; 

import { Router } from "./router";
import { RouteRegestry } from "./route-regestry.service";
import { HOST, PORT } from "./tokens";

export interface RouterModuleForRootOptions {
  host: string;
  port: number;
}

@Module({
  providers: [
    Router, 
    RouteRegestry,
    provideAppInitializers([
      initializeRouter,
    ])
  ],
  exports: [Router, RouteRegestry, APP_INITIALIZER],
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
