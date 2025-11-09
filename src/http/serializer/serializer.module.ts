import { Module } from "@di";
import { RESPONSE_MIDDLEWARES } from "@http/router";

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
  {
    provide: RESPONSE_MIDDLEWARES,
    useValue: contentTypeMiddleware,
    multi: true,
  }
],
exports: [Serializer, DEFAULT_CONTENT_TYPE, RESPONSE_MIDDLEWARES],
})
export class SerializerModule {}