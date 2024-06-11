import type { Configuration as WebpackConfig } from 'webpack'
import path from 'path'

export const extendWebpackConfig = (existingWebpackConfig: WebpackConfig): WebpackConfig => {
  const newConfig: WebpackConfig = {
    ...existingWebpackConfig,
    resolve: {
      ...(existingWebpackConfig.resolve || {}),
      fallback: {
        ...(existingWebpackConfig.resolve?.fallback ? existingWebpackConfig.resolve.fallback : {}),
        stream: false,
      },
      alias: {
        ...(existingWebpackConfig.resolve?.alias ? existingWebpackConfig.resolve.alias : {}),
        '@google-cloud/storage': path.resolve(__dirname, './mock.js'),
      },
    },
  }

  return newConfig
}
