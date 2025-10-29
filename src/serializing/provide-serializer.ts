import type { Provider } from '../di/types/provider';
import type { Constructor } from '../core/types/constructor';
import type { ContentType } from './types/conten-type-map';
import { DEFAULT_CONTENT_TYPE } from './tokens/default-content-type.token';
import type { Serializer } from './serializer.service';

export interface ProvideSerializerOptions {
  serializer: Constructor<Serializer>;
  defaultContentType: ContentType;
}

export function provideSerializer({
  serializer,
  defaultContentType,
}: ProvideSerializerOptions): Provider[] {
  return [
    {
      provide: serializer,
      useClass: serializer,
    },
    {
      provide: DEFAULT_CONTENT_TYPE,
      useValue: defaultContentType,
    },
  ];
}
