import type { Method } from '@shared';

import { updateRouteMetadata } from '../../helpers';

const METHOD_HTTP_CODE_MAP: Record<Method, number> = {
  GET: 200,
  POST: 201,
  PUT: 200,
  DELETE: 204,
};

export function Route(method: Method, path: string) {
  return function (target: any, propertyKey: string) {
    updateRouteMetadata(target, propertyKey, {
      path: path ? `/${path}` : '',
      propertyKey,
      method,
      httpCode: METHOD_HTTP_CODE_MAP[method],
    });
  };
}
