import { HandlerMeta } from '../../routing/classes/handler-metadata';
import type { ContentType } from '../types/conten-type-map';

export function ContentType(contentType: ContentType) {
  return function (target: any, propertyKey: string) {
    const handlers = Reflect.getMetadata('handler', target);
    const metadata = handlers?.[propertyKey] ?? new HandlerMeta();

    const updatedMetaData = metadata.set({ serializeTo: contentType });

    Reflect.defineMetadata('handler', updatedMetaData, target);
  };
}
