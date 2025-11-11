import type { Constructor } from '@repo/common';

import type { Injector } from '../injector';
import type { Providers } from './provider';
import type { DIToken } from './token';

export interface ModuleMetadata {
  module: true;
  injector: Injector;
  name: string;
  controllers: Constructor[];
  providers: Providers;
  imports: Constructor[];
  exports: DIToken[];
}
