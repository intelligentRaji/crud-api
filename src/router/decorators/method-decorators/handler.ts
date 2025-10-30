import { HandlerMeta } from '../../classes';

export function Handler(method: string, path: string) {
  return function (target: any, propertyKey: string) {
    HandlerMeta.updateOn(target, propertyKey, {
      path: path ? `/${path}` : '',
      propertyKey,
      method,
    });
  };
}
