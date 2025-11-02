import { InjectionToken } from '@di';

export const REQUEST_MIDDLEWARES = new InjectionToken<(...args: any[]) => any>(
  'REQUEST_MIDDLEWARES',
);
