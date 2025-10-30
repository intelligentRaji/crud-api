import { InjectionToken } from '@di';

import type { ContentTypeMap } from '../types';

export const DEFAULT_CONTENT_TYPE = new InjectionToken<keyof ContentTypeMap>(
  'DEFAULT_CONTENT_TYPE',
);
