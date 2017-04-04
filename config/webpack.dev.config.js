const webpack = require('webpack')

module.exports = {
	entry: {
		main: [
			"./src/app.jsx",
			'webpack/hot/only-dev-server',
			'webpack-dev-server/client?http://0.0.0.0:8888',
		],
		vendor: ['react', 'redux', 'react-dom', 'react-router']
	},
	devServer: {
		host: "0.0.0.0",
		port: 8888,
		inline: true,
		hot: true,
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"development"'
			}
		}),
	]
}