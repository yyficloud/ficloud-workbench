import React from 'react';
import PropTypes from 'prop-types';
import { CookiesProvider } from 'react-cookie';
import Container from './components/Container';
import classNames from 'classnames';

/**
 * WorkBench控件
 */
class FinanceCloud extends React.Component {
  constructor(props) {
    super(props);
	  this.state = {
	  };
	  this.updateCurrent=this.updateCurrent.bind(this);
  }
	updateCurrent(serviceCode){
  	this.props.updateCurrent(serviceCode);
	}
  render() {
    const { className } = this.props;
	  // iframe里面和外面不是同一个项目，使用内部的version等参数来解决缓存问题
    return (
      <div className={ classNames('ficloud-bench', { [`${className}`]: className })}>
		  <CookiesProvider>
			  <div>
				  <Container {...this.props}/>
			  </div>
		  </CookiesProvider>
      </div>
    );
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
