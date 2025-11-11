import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export function libConfig(entry: string) {
  return defineConfig({
    plugins: [tsconfigPaths()],
    build: {
      lib: {
        entry: resolve(process.cwd(), entry),
        formats: ['cjs', 'es'],
        fileName(format, entryName) {
          console.log('aaaaaaaaaa', entryName);
          return `${entryName}.${format === 'cjs' ? 'cjs' : 'mjs'}`;
        },
      },
      sourcemap: true,
      target: 'es2022',
    },
    publicDir: false,
  });
}
