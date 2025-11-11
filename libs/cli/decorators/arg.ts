import { defineMetadata, getMetadata } from 'libs/core';

import type { CommandMetadata } from '../types';

export function Arg(name: string) {
  return function (target: any) {
    const metadata = getMetadata(target) ?? ({} as CommandMetadata);
    const positionals = [...(metadata.positionals ?? []), name];

    defineMetadata({ ...metadata, positionals }, target);
  };
}
