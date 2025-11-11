import { MetadataError, defineMetadata, getMetadata } from '@repo/core';

import type { ControllerMetadata } from '@router';

import { HandlerMeta } from '../classes';
import type { HandlerMetadata } from '../types';

export function getControllerMetadata(target: any): ControllerMetadata {
  const metadata = getMetadata(target);

  if (!metadata.controller) {
    throw new MetadataError('Use @Controller decorator');
  }

  return metadata;
}

export function getHandlersMetadata(target: any): ControllerMetadata['handlers'] {
  const metadata = getMetadata(target);

  const handlers = metadata.handlers;

  if (!handlers) {
    throw new MetadataError(
      'Use method route decorators (@Get, @Post, @Put, @Delete) to define handler',
    );
  }

  return handlers;
}

export function updateHandlerMetadata(
  target: any,
  propertyKey: string,
  metadata: Partial<HandlerMetadata>,
): void {
  const controller = getMetadata(target);
  const handlers = controller.handlers ?? {};

  const meta = handlers[propertyKey] ?? new HandlerMeta();

  const updated = meta.set(metadata);

  defineMetadata({ ...controller, handlers: { ...handlers, [propertyKey]: updated } }, target);
}
