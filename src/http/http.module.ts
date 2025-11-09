import { Module, extendModule } from '@di';

import { RouterModule, type RouterModuleForRootOptions } from './router';
import { SerializerModule } from './serializer';

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
