const fs = require('fs')
const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackChunkHash = require('webpack-chunk-hash')

module.exports = function (config, env) {
  config.module.loaders[0].exclude.push(/\.ejs$/)
  config.resolve = {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }

  config.module.loaders.forEach(function(loader) {
    if(loader.include) {
      if (loader.test && loader.test.toString() === /\.less$/.toString()) {
        if (env === 'production') loader.loader = ExtractTextPlugin.extract('css-flat!css?importLoaders=1&modules&localIdentName=[path][name]__[local]--[hash:base64:5]!postcss!less')
        else loader.loader = 'style!css?modules!less'
      }
    }
  });
  if (env === 'production') {
    config.output.filename = '[name].[chunkhash].js'
    config.output.chunkFilename = '[chunkhash].async.js'
    config.plugins[3] = new ExtractTextPlugin('[contenthash:20].css', {allChunks: true})
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: 'ejs!src/index.ejs',
        inject: true,
        minify: { collapseWhitespace: true },
        production: true,
      }),
      new WebpackChunkHash({ algorithm: 'md5' })
    )
  } else {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: 'ejs!src/index.ejs',
        inject: true,
      }),
    )
  }
  return config
}
