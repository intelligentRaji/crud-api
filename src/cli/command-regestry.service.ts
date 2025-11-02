import { getMetadata } from '@core';

import type { CommandMetadata } from './types/command';

export class CommandRegestry {
  private readonly commands: Record<string, any> = {};

  public registerCommand(command: any, parent = this.commands): void {
    const metadata = getMetadata(command) as CommandMetadata;

    if (!metadata.command) {
      throw new Error('Use @Command decorator');
    }

    parent[metadata.name] = command;

    metadata.commands.forEach((command) => {
      this.registerCommand(command, parent[metadata.name]);
    });
  }

  public retrieveCommand(input: string[], parent = this.commands): [any, string[]] {
    const [cur, ...rest] = input;

    const command = parent[cur];

    if (!command) {
      throw new Error('Command not found');
    }

    if (getMetadata(command).command) {
      return [command, rest];
    }

    return this.retrieveCommand(rest, command);
  }
}
