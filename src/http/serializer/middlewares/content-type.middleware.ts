import { inject } from '@di';
import { type Middleware, context, response } from '@http/router';

import { Serializer } from '../serializer.service';
import { DEFAULT_CONTENT_TYPE } from '../tokens';

export const contentTypeMiddleware: Middleware = (next) => {
  const data = context();
  const { body, metadata } = data;

  const res = response();
  const defaultContentType = inject(DEFAULT_CONTENT_TYPE);
  const serializer = inject(Serializer);

  res.setHeader('Content-Type', metadata.serializeTo || defaultContentType);
  data.body = serializer.serialize(body, metadata.serializeTo);

  return next();
};
