import { InjectionToken } from '@repo/core';

import type { ContentTypeMap } from '@shared';

export const DEFAULT_CONTENT_TYPE = new InjectionToken<keyof ContentTypeMap>(
  'DEFAULT_CONTENT_TYPE',
);
