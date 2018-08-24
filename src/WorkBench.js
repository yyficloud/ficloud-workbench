import React from 'react';
import PropTypes from 'prop-types';
import Promise from 'promise-polyfill';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import Container from './components/Container';
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
	}

	updateCurrent(serviceCode) {
		this.props.updateCurrent(serviceCode);
	}
	render() {
		return (
			<Provider store={store}>
				<Container {...this.props}/>
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
