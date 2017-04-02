const webpack = require('webpack')

module.exports = {
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