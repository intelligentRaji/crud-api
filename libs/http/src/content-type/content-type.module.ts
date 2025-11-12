import { Module } from "@repo/core";

import { MIDDLEWARE, provideMiddlewares } from "@router";

import { Serializer } from "./serializer.service";
import { DEFAULT_CONTENT_TYPE } from "./tokens";
import { contentTypeMiddleware } from "./middlewares";

@Module({
  providers: [
    Serializer, 
  {
    provide: DEFAULT_CONTENT_TYPE,
    useValue: 'application/json',
  },
  provideMiddlewares([
    contentTypeMiddleware,
  ]),
],
exports: [Serializer, DEFAULT_CONTENT_TYPE, MIDDLEWARE],
})
export class ContentTypeModule {}