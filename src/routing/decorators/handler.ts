export interface HandlerMetadata {
  path: string;
  propertyKey: string;
  method: string;
}

export function Handler(
  method: string,
  path: string,
  transformFn: (fn: PropertyDescriptor) => void,
) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const handlers = Reflect.getMetadata('handlers', target) || [];
    handlers.push({ path: path ? `/${path}` : '', propertyKey, method });
    Reflect.defineMetadata('handlers', handlers, target);

    return transformFn(descriptor);
  };
}
