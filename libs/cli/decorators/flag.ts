import { booleanValidator } from '../validators';
import { Option, type OptionOptions } from './option';

export interface FlagOptions extends Omit<OptionOptions, 'validation' | 'defaultValue'> {
  defaultValue?: boolean;
}

export function Flag(name: string, { defaultValue = true, alias }: FlagOptions) {
  return Option(name, {
    defaultValue: defaultValue.toString(),
    alias,
    validation: booleanValidator,
  });
}
