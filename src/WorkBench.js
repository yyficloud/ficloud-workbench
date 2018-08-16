import React from 'react';
import PropTypes from 'prop-types';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import Container from './components/Container';
/**
 * WorkBench控件
 */

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger());
}

const store = createStore(
	reducer,
	applyMiddleware(...middleware)
);

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
