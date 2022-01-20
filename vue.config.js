process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
	configureWebpack: {
		performance: {
			maxEntrypointSize: 10240000,
			maxAssetSize: 10240000
		},
		output: {
			filename: "js/[name].js",
			chunkFilename: "js/[name].bundle.js",
		},
	},
	chainWebpack: config => {
		// shoelace
		config.module
			.rule('vue')
			.use('vue-loader')
				.loader('vue-loader')
				.tap(options => {
					options.compilerOptions = {
						...(options.compilerOptions || {}),
						isCustomElement: tag => /^ion-/.test(tag)
					};
					return options;
				});
	},
	css: {
		extract: {
			filename: 'css/[name].app.css'
		}
	},
	productionSourceMap: false,
	publicPath: '/',
}
