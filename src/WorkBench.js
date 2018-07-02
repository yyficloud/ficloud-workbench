import React from 'react';
import PropTypes from 'prop-types';
// import Apps from "./components/App";

/**
 * WorkBench控件
 */
export default class WorkBench extends React.Component {
  static displayName = 'WorkBench'
  static propTypes = {
    /**
     * 自定义类名
     */
    className: PropTypes.string,
    value: PropTypes.string
  };

  state = {
  };

  constructor(props) {
    super(props);
  }


  render() {
    const { value,className } = this.props;
    return (
      <div className={ className ? className : ''}>
		财务云工作区
        <p>{ value ? value : ''}</p>
      </div>
    );
  }
}
