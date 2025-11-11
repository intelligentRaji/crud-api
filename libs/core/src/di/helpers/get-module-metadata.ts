import { getMetadata } from '../../metadata';
import { type ModuleMetadata } from '../types';

export function getModuleMetadata(module: any): ModuleMetadata {
  return getMetadata(module);
}
