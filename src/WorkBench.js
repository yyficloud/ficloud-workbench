import React from 'react';
import PropTypes from 'prop-types';
import Titles from './components/Titles';
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
    return (
      <div className={ classNames('ficloud-bench', { [`${className}`]: className })}>
		<Titles />
        <p>{ value ? value : '默认test'}</p>
      </div>
    );
  }
}
WorkBench.propTypes = {
	/**
	 * 自定义类名
	 */
	className: PropTypes.string,
	value: PropTypes.string
};
export default WorkBench;
