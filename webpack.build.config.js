const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = [{
	// devtool: 'cheap-module-source-map',
	context: path.resolve(__dirname, 'src'),
	entry: {
		index: 'index.js',
		// 'ficloud-workbench': './../less/default.less',
	},
	output: {
		libraryTarget: 'umd',
		library: 'ficloud-workbench',
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		publicPath: '/',
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
					use: ['css-loader', 'less-loader'],
				})
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'less-loader'],
				})
			}
		],
	},
	resolve: {
		modules: [path.resolve(__dirname, 'src'), 'node_modules'],
		extensions: ['.js', '.jsx'],
	},
	externals: [
		{
			'react-dom': {
				root: 'ReactDOM',
				commonjs2: 'react-dom',
				commonjs: 'react-dom',
				amd: 'react-dom'
			}
		},
		{
			react: {
				root: 'React',
				commonjs2: 'react',
				commonjs: 'react',
				amd: 'react'
			}
		},{
			'prop-types': {
				root: 'PropTypes',
				commonjs2: 'prop-types',
				commonjs: 'prop-types',
				amd: 'prop-types'
			}
		},{
			'classnames': {
				root: 'classNames',
				commonjs2: 'classnames',
				commonjs: 'classnames',
				amd: 'classnames'
			}
		},
		{
			lodash: {
				commonjs: 'lodash',
				commonjs2: 'lodash',
				amd: 'lodash',
				root: '_'
			}
		}
		,{
			jquery: {
				commonjs: 'jquery',
				commonjs2: 'jquery',
				amd: 'jquery',
				root: '$'
			}
		},{
			localforage: {
				commonjs: 'localforage',
				commonjs2: 'localforage',
				amd: 'localforage',
				root: 'localforage'
			}
		}
	],
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
			}
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(true),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			comments: false,
			output: {
				comments: false    // remove all comments
			},
			// sourceMap: false,
		}),
	]
}
];
