import { Module } from "@repo/core";

import {MIDDLEWARE, provideMiddlewares} from '@router';

import { DEFAULT_HTTP_CODE } from "./tokens";
import { HttpCodeMiddleware } from "./middlewares";

@Module({
  providers: [
    {provide: DEFAULT_HTTP_CODE, useValue: 200},
    provideMiddlewares([
      HttpCodeMiddleware,
    ]),
  ],
  exports: [DEFAULT_HTTP_CODE, MIDDLEWARE],
})
export class HttpCodeModule {}