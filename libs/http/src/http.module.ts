import { Module, extendModule } from '@repo/core';

import { RouterModule, type RouterModuleForRootOptions } from './router';
import { ContentTypeModule } from '@content-type';
import { HttpCodeModule } from '@http-code';

export type HttpModuleForRootOptions = RouterModuleForRootOptions;

@Module({
  imports: [ContentTypeModule, HttpCodeModule],
  exports: [ContentTypeModule, HttpCodeModule],
})
export class HttpModule {
  static forRoot({ host, port }: HttpModuleForRootOptions) {
    return extendModule(ContentTypeModule, {
      imports: [RouterModule.forRoot({ host, port })],
      exports: [RouterModule],
    });
  }
}
