const webpack = require('webpack')

module.exports = {
	entry: {
		main: [
			"./src/app.jsx",
			'webpack/hot/only-dev-server',
			'webpack-dev-server/client?http://0.0.0.0:8888',
		]
	},
	devServer: {
		host: "0.0.0.0",
		port: 8888,
		inline: true,
		hot: true,
		proxy: {
			'/user/*': {
				target: 'http://127.0.0.1:3000',
				secure: false
			},
			'/api/*': {
				target: 'http://127.0.0.1:3000',
				secure: false
			},
		}
	},
	plugins: [
		// new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"development"'
			}
		}),
	]
}