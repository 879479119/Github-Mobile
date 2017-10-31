const webpack = require('webpack')

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: {
    main: [
      './src/app.js',
      'webpack/hot/only-dev-server',
      'webpack-dev-server/client?http://127.0.0.1:8888',
    ],
  },
  devServer: {
    disableHostCheck: true,
    host: '127.0.0.1',
    port: 8888,
    inline: true,
    hot: true,
    proxy: {
      '/user/*': {
        target: 'http://127.0.0.1:3000',
        secure: false,
      },
      '/api/*': {
        target: 'http://127.0.0.1:3000',
        secure: false,
      },
    },
  },
  plugins: [
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
    }),
  ],
}
