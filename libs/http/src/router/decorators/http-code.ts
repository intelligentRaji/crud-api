import { updateHandlerMetadata } from '@common';

export function HttpCode(code: number) {
  return (target: any, propertyKey: string) => {
    updateHandlerMetadata(target, propertyKey, {
      httpCode: code,
    });
  };
}
