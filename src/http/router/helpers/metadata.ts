import { MetadataError } from 'core/errors/metadata.error';

import { defineMetadata, getMetadata } from '@core';

import { HandlerMeta } from '../classes';
import type { ControllerMetadata, HandlerMetadata } from '../types';

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
  metadata: HandlerMetadata,
): void {
  const controller = getMetadata(target);
  const handlers = controller.handlers ?? {};

  const meta = handlers[propertyKey] ?? new HandlerMeta();

  const updated = meta.set(metadata);

  defineMetadata({ ...controller, handlers: { ...handlers, [propertyKey]: updated } }, target);
}
