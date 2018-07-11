import React from 'react';
import PropTypes from 'prop-types';
import { CookiesProvider } from 'react-cookie';
import Container from './components/Container';
import classNames from 'classnames';

/**
 * WorkBench控件
 */
class WorkBench extends React.Component {
  constructor(props) {
    super(props);
	  this.state = {
	  };
  }

  render() {
    const { value,className } = this.props;
	  // iframe里面和外面不是同一个项目，使用内部的version等参数来解决缓存问题
	  let url = decodeURIComponent(value.url);
    return (

      <div className={ classNames('ficloud-bench', { [`${className}`]: className })}>
		  <CookiesProvider>
			  <div>
				  <Container {...this.props}/>
			  </div>
		  </CookiesProvider>
		  <script src="./other/messenger.js" type="text/javascript"></script>
		  <script type="text/javascript" src="./other/home.global.js"></script>
      </div>
    );
  }
}
WorkBench.propTypes = {
	/**
	 * 自定义类名
	 */
	className: PropTypes.string,
	value: PropTypes.object
};
export default WorkBench;
