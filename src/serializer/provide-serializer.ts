import type { Constructor } from '@core';
import type { Provider } from '@di';

import type { Serializer } from './serializer.service';
import { DEFAULT_CONTENT_TYPE } from './tokens';
import type { ContentTypeMap } from './types';

export interface ProvideSerializerOptions {
  serializer: Constructor<Serializer>;
  defaultContentType: keyof ContentTypeMap;
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
