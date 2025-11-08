import type { Provider } from './provider';

export interface ModuleMetadata {
  module: boolean;
  exports: Provider[];
}
