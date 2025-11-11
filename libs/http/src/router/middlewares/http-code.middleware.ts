import { inject } from '@repo/core';

import { DEFAULT_HTTP_CODE, METADATA, response } from '../tokens';
import type { Middleware } from '../types';

export const HttpCodeMiddleware: Middleware = async (body, next) => {
  const res = response();
  const metadata = inject(METADATA);

  res.statusCode = metadata.httpCode ?? inject(DEFAULT_HTTP_CODE);

  next(body);
};
