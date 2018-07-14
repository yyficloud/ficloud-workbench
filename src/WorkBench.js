import React from 'react';
import PropTypes from 'prop-types';
import Container from './components/Container';
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
	  // iframe里面和外面不是同一个项目，使用内部的version等参数来解决缓存问题
    return (
		<Container {...this.props}/>
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
