/*
 * @Date: 2020-08-13 20:58:42
 * @LastEditors: cyf
 * @LastEditTime: 2020-12-05 12:29:16
 * @FilePath: \cyf-cloud.front\vue.config.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */
// vue.config.js 配置说明
//官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档

const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';

let banner =
"%c================================================\n"+
"             __            _                 _\n"+
"  ___ _   _ / _|       ___| | ___  _   _  __| |\n"+
" / __| | | | |_ _____ / __| |/ _ \\| | | |/ _` |\n"+
"| (__| |_| |  _|_____| (__| | (_) | |_| | (_| |\n"+
" \\___|\\__, |_|        \\___|_|\\___/ \\__,_|\\__,_|\n"+
"      |___/                                     \n"+
"================================================\n"

console.log( banner, 'color: cyan;')

console.log( "is production >", isProduction )
console.log( "api address >", process.env.VUE_APP_BACKEND_SERVER_ADDR )

module.exports = {
	// 部署生产环境和开发环境下的URL。
	// 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
	//例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 baseUrl 为 /my-app/。
	//baseUrl 从 Vue CLI 3.3 起已弃用，请使用publicPath
	//baseUrl: process.env.NODE_ENV === "production" ? "./" : "/",
	// publicPath: process.env.NODE_ENV === "production" ? "/cyf-gh.github.io/" : "/",

	// outputDir: 在npm run build 或 yarn build 时 ，生成文件的目录名称
	outputDir: isProduction? "mycli3" : ".githubpages",
	//用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
	assetsDir: "assets",
	//指定生成的 index.html 的输出路径  (打包之后，改变系统默认的index.html的文件名)
	// indexPath: "myIndex.html",
	//默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
	filenameHashing: true,

	//   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
	// lintOnSave: true,
	//如果你想要在生产构建时禁用 eslint-loader，你可以用如下配置
	// lintOnSave: process.env.NODE_ENV !== 'production',
	lintOnSave: process.env.NODE_ENV !== 'production',

	//是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。(默认false)
	// runtimeCompiler: false,

	/**
	 * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
	 *  打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
	 *  map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
	 *  有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
	 * */
	productionSourceMap: false,
	
	// // 它支持webPack-dev-server的所有选项
	// devServer: {
	// 	port: 8887,
	// 	https: false,
	// 	disableHostCheck: true,
	// 	// 配置多个代理
	// 	proxy: {
	// 		'/vt': {
	// 			enable: true,
	// 			target: 'http://localhost:2334/v1/vt/',
	// 			secure: false,
	// 			changeOrigin: true,
	// 			pathRewrite: {
	// 				'^/vt': '', // rewrite path
	// 			}
	// 		},
	// 		'/v1x1': {
	// 			enable: true,
	// 			target: 'http://192.168.50.242:2334/v1x1/',
	// 			secure: false,
	// 			changeOrigin: true,
	// 			pathRewrite: {
	// 				'^/v1x1': '', // rewrite path
	// 			}				
	// 		}
	// 	}
	// },
	// chainWebpack: config => {
	// 	if (isProduction) {
	// 		// 压缩代码
	// 		config.optimization.minimize(true)
	// 		// 分割代码
	// 		config.optimization.splitChunks({
	// 			chunks: 'all'
	// 		})
	// 	}
	// },

	chainWebpack: config => {
		// 查看打包文件体积大小
		config
		.plugin('webpack-bundle-analyzer')
		.use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
	},

	configureWebpack: config => {
		// config.optimization = {
		// 	splitChunks: {
		// 		// 表示选择哪些 chunks 进行分割，可选值有：async，initial和all
		// 		chunks: "async",
		// 		// 表示新分离出的chunk必须大于等于minSize，默认为30000，约30kb。
		// 		minSize: 30000,
		// 		// 表示一个模块至少应被minChunks个chunk所包含才能分割。默认为1。
		// 		minChunks: 1,
		// 		cacheGroups: {
		// 			vendor: {
		// 				chunks: 'all',
		// 				test: /node_modules/,
		// 				name: 'vendor',
		// 				minChunks: 1,
		// 				maxInitialRequests: 5,
		// 				minSize: 0,
		// 				priority: 100
		// 			},
		// 			common: {
		// 				chunks: 'all',
		// 				test: /[\\/]src[\\/]js[\\/]/,
		// 				name: 'common',
		// 				minChunks: 2,
		// 				maxInitialRequests: 5,
		// 				minSize: 0,
		// 				priority: 60
		// 			},
		// 			styles: {
		// 				name: 'styles',
		// 				test: /\.(sa|sc|c)ss$/,
		// 				chunks: 'all',
		// 				enforce: true
		// 			},
		// 			runtimeChunk: {
		// 				name: 'manifest'
		// 			}
		// 		}
		// 	}
		// }
		if (isProduction) {
			// 代码压缩
			config.plugins.push(
				new UglifyJsPlugin({
					uglifyOptions: {
						//生产环境自动删除console
						warnings: false, // 若打包错误，则注释这行
						compress: {
							drop_debugger: true,
							drop_console: true,
							pure_funcs: ['console.log']
						}
					},
					sourceMap: false,
					parallel: true
				})
			)
		}
		if (isProduction) {
			config.plugins.push(new CompressionWebpackPlugin({
				algorithm: 'gzip',
				test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
				threshold: 10240,
				minRatio: 0.8
			}))
			config.externals = {
				'vue': 'Vue',
				'vue-router': 'VueRouter',
				'axios': 'axios',
				'bootstrap-vue': 'bootstrap-vue',
				'cropper.js': 'cropper.js',
				'marked.js':'marked'
			}
		} else {
			console.log()
		}
	},
};