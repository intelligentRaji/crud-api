import { type Constructor } from '@repo/common';

import { getMetadata } from '../../../metadata';
import { MetadataError } from '../../errors';

export function assertIsModule(module: any, errorMessage?: string): asserts module is Constructor {
  if (!getMetadata(module).module) {
    throw new MetadataError(`Class ${module.name} is not a module. ${errorMessage}`);
  }
}
