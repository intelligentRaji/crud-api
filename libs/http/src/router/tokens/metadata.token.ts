import { InjectionToken } from '@repo/core';

import type { HandlerMetadata } from '@common';

export const METADATA = new InjectionToken<Readonly<HandlerMetadata>>('METADATA');
