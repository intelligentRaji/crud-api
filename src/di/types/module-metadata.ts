import type { Constructor } from '@core';

import type { Injector } from '../injector';
import type { Provider } from './provider';
import type { DIToken } from './token';

export interface ModuleMetadata {
  module: true;
  injector: Injector;
  name: string;
  controllers: Constructor[];
  providers: Provider[];
  imports: Constructor[];
  exports: DIToken[];
}
