import { MetadataError } from 'core/errors/metadata.error';

import { type Constructor, getMetadata } from '@core';

export function assertIsModule(module: Constructor, errorMessage?: string): void {
  if (!getMetadata(module).module) {
    throw new MetadataError(`Class ${module.name} is not a module. ${errorMessage}`);
  }
}
