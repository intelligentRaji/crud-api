import { DIError, InjectionToken, inject } from '@repo/core';

export const PARAMS = new InjectionToken<Record<string, string>>('PARAMS');

export function params(param: string): string;
export function params<T>(): T;
export function params<T extends Record<string, string>>(param?: string): T | string {
  const params = inject(PARAMS);

  if (param) {
    const value = params[param];

    if (!value) {
      throw new DIError(`Param ${param} not found`);
    }

    return value;
  }

  return params as T;
}
