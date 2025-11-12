import { builtinModules } from 'node:module';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export async function libConfig(entry: string, deps: string[] = []) {
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
          return `${entryName}.${format === 'cjs' ? 'cjs' : 'js'}`;
        },
      },
      sourcemap: true,
      target: 'es2022',
      rollupOptions: {
        external: [
          ...builtinModules.map((m) => `node:${m}`),
          ...Object.keys(pkg.dependencies || {}),
          ...deps,
        ],
      },
    },
    publicDir: false,
  });
}
