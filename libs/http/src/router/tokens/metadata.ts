import { InjectionToken } from '@repo/core';

import type { RouteMetadata } from '../types';

export const METADATA = new InjectionToken<Readonly<RouteMetadata>>('METADATA');
