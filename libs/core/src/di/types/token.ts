import type { Constructor } from '@repo/common';

import type { InjectionToken } from '../injection-token';

export type DIToken<T = any> = Constructor<T> | InjectionToken<T>;
