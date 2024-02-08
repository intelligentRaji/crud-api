import { Configuration } from 'webpack'
import config from 'webpack.config.js'

const prodConfig: Configuration = {
  ...config,
  mode: 'production',
}

export default prodConfig
