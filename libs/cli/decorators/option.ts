import { defineMetadata, getMetadata } from 'libs/core';

import type { CommandMetadata, OptionMetadata } from '../types';

export type OptionOptions = Omit<OptionMetadata, 'name'>;

export function Option(name: string, { defaultValue = '', alias, validation }: OptionOptions) {
  return function (target: any) {
    const optionMetadata: OptionMetadata = {
      name,
      defaultValue,
      alias,
      validation,
    };

    const metadata = getMetadata(target) ?? ({} as CommandMetadata);
    const options = { ...(metadata.options ?? {}), [name]: optionMetadata };

    defineMetadata({ ...metadata, options }, target);
  };
}
