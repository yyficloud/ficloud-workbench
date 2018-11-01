import React from 'react';
import PropTypes from 'prop-types';
import Promise from 'promise-polyfill';
import { Provider } from 'react-redux';
import intl from 'react-intl-universal';
import IntlPolyfill from 'intl';
import { GetCookie } from './utils/findPath';
import { configureStore } from './store/configureStore';
import Container from './components/Container';
global.Intl = IntlPolyfill;
require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/zh.js');
require('intl/locale-data/jsonp/fr.js');
require('intl/locale-data/jsonp/ja.js');
const SUPPOER_LOCALES = ['en_US','zh_CN','zh_TW'];

/**
 * WorkBench控件
 */
// IE11
if (!window.Promise) {
	window.Promise = Promise;
}
const store = configureStore();

class FinanceCloud extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.updateCurrent = this.updateCurrent.bind(this);
		const { locale  } = window.diworkContext();
		let currentLocale = locale;
		currentLocale = SUPPOER_LOCALES.indexOf(currentLocale) > -1 ? currentLocale : 'zh_CN';
		intl.init({
			currentLocale,
			locales: {
				[currentLocale]: require(`./locales/${currentLocale}`)
			}
		});
	}

	updateCurrent(serviceCode) {
		this.props.updateCurrent(serviceCode);
	}
	render() {
		return (
			<Provider store={store}>
				<Container {...this.props} currentLocale={this.currentLocale}/>
			</Provider>);
	}
}

FinanceCloud.propTypes = {
	/**
	 * 自定义类名
	 */
	className: PropTypes.string,
	current: PropTypes.object,
	menuItems:PropTypes.array,
	updateCurrent:PropTypes.func,
};
export default FinanceCloud;
