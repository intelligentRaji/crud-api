import { inject } from '../../di/inject';
import { InjectionToken } from '../../di/injection-token';

export const PARAMS = new InjectionToken<Record<string, string>>('PARAMS');

export function params(param: string): string;
export function params<T>(): T;
export function params<T extends Record<string, string>>(param?: string): T | string {
  const params = inject(PARAMS);

  if (param) {
    return params[param];
  }

  return params as T;
}
