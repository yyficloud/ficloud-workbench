import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import {minify} from 'uglify-es';
import commonjs from 'rollup-plugin-commonjs';
const name = 'FinanceCloud';
const path = 'dist/ficloud-workbench';
const globals = {
	classnames: 'classNames',
	'prop-types': 'PropTypes',
	'react-dom': 'ReactDOM',
	'react': 'React',
	'lodash':'lodash',
	'jquery':'jquery',
	'localforage':'localforage',
	'react-onclickoutside':'OnClickOutside',
};
const external = Object.keys(globals);
const babelOptions = (production) => {
	let result = {
		babelrc: false,
		presets: [['env', {modules: false}], 'stage-0', 'react'],
		plugins: ['transform-decorators-legacy', 'external-helpers', 'transform-class-properties'],
	};
	if (production) {
		result.plugins.push('transform-react-remove-prop-types');
	}
	;
	return result;
};

export default [
	{
		input: 'src/index.js',
		output: {
			file: path + '.es.js',
			format: 'es',
		},
		external: external,
		plugins: [ babel(babelOptions(false)),resolve(
			{
				jsnext: true,
				main: true,
				browser: true
			}
		),
			commonjs()],
	},
	{
		input: 'src/index.umd.js',
		output: {
			name: name,
			file: path + '.js',
			format: 'umd',
		},
		globals: globals,
		external: external,
		plugins: [ babel(babelOptions(false)), resolve({
			jsnext: true,
			main: true,
			browser: true
		}),commonjs({
		})
		],
	},
	{
		input: 'src/index.umd.js',
		output: {
			name: name,
			file: path + '.min.js',
			format: 'umd',
		},
		globals: globals,
		external: external,
		plugins: [ babel(babelOptions(true)), resolve({
				jsnext: true,
				main: true,
				browser: true
			}
		),commonjs({
		}), uglify({}, minify)
		],
	},
];
