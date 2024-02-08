import { Configuration } from 'webpack'
import { EsbuildPlugin } from 'esbuild-loader'
import config from 'webpack.config.js'

const devConfig: Configuration = {
  ...config,
  mode: 'development',
  optimization: {
    minimizer: [new EsbuildPlugin()],
  },
}

export default devConfig
