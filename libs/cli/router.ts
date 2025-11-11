import { getMetadata } from 'libs/core';
import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline';

import { Injector, inject, runInInjectionContext } from '@di';

import { CommandRegestry } from './command-regestry.service';
import type { CommandMetadata } from './types/command';
import type { Executable } from './types/executable';

export class Router {
  private readonly commandRegestry = inject(CommandRegestry);

  private readonly interface = createInterface({
    input: stdin,
    output: stdout,
  });

  constructor() {
    this.interface.on('line', async (input) => {
      const [command, args] = this.commandRegestry.retrieveCommand(input.split(' '));

      await this.handleInput(args, command);
    });
  }

  private async handleInput(args: string[], command: Executable): Promise<void> {
    const commandMetadata = getMetadata(command) as CommandMetadata;

    const parent = inject(Injector);
    const injector = new Injector(parent, []);

    runInInjectionContext(async () => {
      await command.execute();
    }, injector);
  }
}

function parseArgs(argv: string[], commandMetadata: CommandMetadata) {
  const { options: commandOptions, positionals: commandPositionals } = commandMetadata;

  const options: Record<string, string> = {};
  const positionals: Record<string, string> = {};

  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];

    // --- Double dash --key or --key=value
    if (token.startsWith('--')) {
      const [rawKey, maybeValue] = token.slice(2).split('=');
      const key = rawKey.trim();

      if (maybeValue !== undefined) {
        // --key=value
        options[key] = maybeValue;
      } else {
        const next = argv[i + 1];
        if (next && !next.startsWith('-')) {
          // --key value
          options[key] = next;
          i++;
        } else {
          // plain flag
          flags[key] = true;
        }
      }

      // TODO: -d to --debug

      // --- Single dash -k or -abc or -k value
    } else if (token.startsWith('-') && token.length > 1) {
      const letters = token.slice(1).split('');

      // if multiple short flags merged: -abc → a,b,c
      if (letters.length > 1) {
        for (const letter of letters) {
          flags[letter] = true;
        }
      } else {
        const key = letters[0];
        const next = argv[i + 1];
        if (next && !next.startsWith('-')) {
          options[key] = next;
          i++;
        } else {
          flags[key] = true;
        }
      }

      // --- Positional arg
    } else {
      positionals[commandPositionals[i]] = token;
    }
  }

  return { options, positionals };
}
