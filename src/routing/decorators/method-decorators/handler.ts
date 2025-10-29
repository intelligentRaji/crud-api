export interface HandlerMetadata {
  path: string;
  propertyKey: string;
  method: string;
}

export function Handler(method: string, path: string) {
  return function (target: any, propertyKey: string) {
    const handlers = Reflect.getMetadata('handlers', target) || [];
    handlers.push({ path: path ? `/${path}` : '', propertyKey, method });
    Reflect.defineMetadata('handlers', handlers, target);
  };
}
