import type { Constructor } from 'libs/common';

import type { InjectionToken } from '../injection-token';

export type DIToken<T = any> = Constructor<T> | InjectionToken<T>;
