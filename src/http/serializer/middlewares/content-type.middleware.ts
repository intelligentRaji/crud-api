import { inject } from '@di';
import { METADATA, type Middleware, response } from '@http/router';

import { Serializer } from '../serializer.service';
import { DEFAULT_CONTENT_TYPE } from '../tokens';

export const contentTypeMiddleware: Middleware = async (body, next) => {
  const metadata = inject(METADATA);
  const res = response();
  const defaultContentType = inject(DEFAULT_CONTENT_TYPE);
  const serializer = inject(Serializer);

  res.setHeader('Content-Type', metadata.serializeTo || defaultContentType);

  return await next(serializer.serialize(body, metadata.serializeTo));
};
