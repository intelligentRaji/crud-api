import { MetadataError, defineMetadata, getMetadata } from '@repo/core';

import { RouteMeta } from '../classes';
import type { ControllerMetadata, RouteMetadata } from '../types';

export function getControllerMetadata(target: any): ControllerMetadata {
  const metadata = getMetadata(target);

  if (!metadata.controller) {
    throw new MetadataError('Use @Controller decorator');
  }

  return metadata;
}

export function getRoutesMetadata(target: any): ControllerMetadata['handlers'] {
  const metadata = getMetadata(target);

  const handlers = metadata.handlers;

  if (!handlers) {
    throw new MetadataError(
      'Use method route decorators (@Get, @Post, @Put, @Delete) to define handler',
    );
  }

  return handlers;
}

export function updateRouteMetadata(
  target: any,
  propertyKey: string,
  metadata: Partial<RouteMetadata>,
): void {
  const controller = getMetadata(target);
  const handlers = controller.handlers ?? {};

  const meta = handlers[propertyKey] ?? new RouteMeta();

  const updated = meta.set(metadata);

  defineMetadata({ ...controller, handlers: { ...handlers, [propertyKey]: updated } }, target);
}
