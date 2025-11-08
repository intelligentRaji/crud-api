import type { Constructor } from '@core';

import type { InjectionToken } from '../injection-token';

export type DIToken<T = any> = Constructor<T> | InjectionToken<T>;
