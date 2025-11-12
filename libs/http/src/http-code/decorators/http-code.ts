import { updateRouteMetadata } from '@router';

export function HttpCode(code: number) {
  return (target: any, propertyKey: string) => {
    updateRouteMetadata(target, propertyKey, {
      httpCode: code,
    });
  };
}
