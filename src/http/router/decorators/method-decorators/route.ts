import { updateHandlerMetadata } from '@http/router/helpers';

import type { Method } from '../../types';

export function Route(method: Method, path: string) {
  return function (target: any, propertyKey: string) {
    updateHandlerMetadata(target, propertyKey, {
      path: path ? `/${path}` : '',
      propertyKey,
      method,
    });
  };
}
