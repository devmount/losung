const webpack = require('webpack')
const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0

module.exports = {
	configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					PACKAGE_VERSION: '"' + version + '"'
				}
			})
		],
		performance: {
			maxEntrypointSize: 10240000,
			maxAssetSize: 10240000
		},
		output: {
			filename: "js/[name].js",
			chunkFilename: "js/[name].bundle.js",
		},
	},
	publicPath: '/'
}
