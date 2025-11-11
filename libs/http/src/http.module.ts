import { Module, extendModule } from '@repo/core';

import { RouterModule, type RouterModuleForRootOptions } from './router';
import { SerializerModule } from './content-type';

export type HttpModuleForRootOptions = RouterModuleForRootOptions;

@Module({
  imports: [SerializerModule],
  exports: [SerializerModule],
})
export class HttpModule {
  static forRoot({ host, port }: HttpModuleForRootOptions) {
    return extendModule(HttpModule, {
      imports: [RouterModule.forRoot({ host, port })],
      exports: [RouterModule],
    });
  }
}
