import { HandlerMeta } from '../../classes/handler-metadata';

export function Handler(method: string, path: string) {
  return function (target: any, propertyKey: string) {
    const handlers = Reflect.getMetadata('handlers', target) || {};
    handlers[propertyKey] = new HandlerMeta({
      path: path ? `/${path}` : '',
      propertyKey,
      method,
    });
    Reflect.defineMetadata('handlers', handlers, target);
  };
}
