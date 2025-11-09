import { extendModule, inject, Module } from "@di";

import { Router } from "./router";
import { RouteRegestry } from "./route-regestry.service";
import { HOST, PORT } from "./tokens";
import { APP_INITIALIZER, provideAppInitializer } from "@core";

export interface RouterModuleForRootOptions {
  host: string;
  port: number;
}

@Module({
  providers: [
    Router, 
    RouteRegestry, 
    provideAppInitializer(() => {
      // Instantiates router
      inject(Router);
    })
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
