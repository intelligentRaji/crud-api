import { join } from 'path'
import { Configuration } from 'webpack'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

const __dirname = import.meta.dirname

const config: Configuration = {
  context: __dirname,
  entry: './src/index.ts',
  output: {
    filename: '[name].js',
    path: join(__dirname, 'dist'),
    clean: true,
  },
  externalsPresets: { node: true },
  plugins: [new ForkTsCheckerWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        exclude: ['/node_modules/'],
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.ts'],
  },
}

export default config
