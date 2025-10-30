import { HandlerMeta } from '../../classes';
import type { Method } from '../../types';

export function Handler(method: Method, path: string) {
  return function (target: any, propertyKey: string) {
    HandlerMeta.updateOn(target, propertyKey, {
      path: path ? `/${path}` : '',
      propertyKey,
      method,
    });
  };
}
