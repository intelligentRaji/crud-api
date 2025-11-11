import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export async function libConfig(entry: string) {
  const libDirPath = process.cwd();
  const pkgPath = pathToFileURL(resolve(libDirPath, 'package.json')).href;

  const { default: pkg } = await import(pkgPath, { with: { type: 'json' } });

  return defineConfig({
    plugins: [tsconfigPaths()],
    build: {
      lib: {
        entry: resolve(libDirPath, entry),
        formats: ['cjs', 'es'],
        fileName(format, entryName) {
          return `${entryName}.${format === 'cjs' ? 'cjs' : 'mjs'}`;
        },
      },
      sourcemap: true,
      target: 'es2022',
      rollupOptions: {
        external: Object.keys(pkg.dependencies || {}),
      },
    },
    publicDir: false,
  });
}
