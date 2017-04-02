const webpack = require('webpack')

module.exports = {
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
	]
}