import { defineMetadata } from '@core';
import { inject } from '@di';

import { CommandRegestry } from '../command-regestry.service';

export function Command(name: string) {
  return function (target: any) {
    defineMetadata({ command: true, name }, target.prototype);

    return class extends target {
      constructor(...args: any[]) {
        super(...args);
        const router = inject(CommandRegestry);
        router.registerCommand(this);
      }
    };
  };
}
