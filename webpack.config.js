const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {
	context: path.resolve(__dirname, 'examples/src'),
	entry: {
		app: './app.js',
	},
	output: {
		path: path.resolve(__dirname, 'examples/dist'),
		filename: '[name].js',
		publicPath: '/',
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'examples/src'),
		port: 8000,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [{
					loader: 'babel-loader',
					options: { presets: [ 'env', 'stage-0', 'react'] ,
						'plugins': [
							'transform-decorators-legacy','transform-class-properties','transform-runtime'
						], },
				}],
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'less-loader', 'resolve-url-loader'],
				})
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'less-loader', 'resolve-url-loader'],
				})
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
					}
				]
			},{
		        test: /\.(woff|woff2|ttf|eot|svg)$/,
		        use: [
		          {
		            loader: 'file-loader',
		            options: {
		              name: './fonts/[name]-[hash].[ext]',
		            }
		          }
		        ]
		      }
		],
	},
	resolve: {
		alias: {
			'ficloud-workbench': path.resolve(__dirname, 'src/index'),
		}
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'common.js',
			minChunk: 2,
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			inject: false,
			template: path.resolve(__dirname, 'examples/src/index.html')
		}),
		new webpack.ProvidePlugin({
			$:'jquery',
			jQuery:'jquery',
			'window.jQuery':'jquery'
		}),
		new ExtractTextPlugin('example.css'),
		
	]
};
