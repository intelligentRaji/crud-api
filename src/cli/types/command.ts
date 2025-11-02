export interface CommandMetadata {
  command: true;
  name: string;
  commands: CommandMetadata[];
  positionals: string[];
  options?: Record<string, OptionMetadata>;
}

export interface OptionMetadata {
  name: string;
  defaultValue: string;
  alias?: string;
  validation?: (value: string) => boolean;
}
