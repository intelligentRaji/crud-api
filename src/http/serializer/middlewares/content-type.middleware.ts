import { inject } from '@di';
import { type Middleware, context } from '@http/router';

import { Serializer } from '../serializer.service';

export const contentTypeMiddleware: Middleware = (next) => {
  const data = context();
  const { body, metadata } = data;

  if (!metadata.serializeTo) {
    return next();
  }

  const serializer = inject(Serializer);

  data.body = serializer.serialize(body, metadata.serializeTo);
};
