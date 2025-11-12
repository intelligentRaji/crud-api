import { inject } from '@repo/core';

import { METADATA, type Middleware, response } from '@router';

import { DEFAULT_HTTP_CODE } from '../tokens';

export const HttpCodeMiddleware: Middleware = async (body, next) => {
  const res = response();
  const metadata = inject(METADATA);

  res.statusCode = metadata.httpCode ?? inject(DEFAULT_HTTP_CODE);

  next(body);
};
