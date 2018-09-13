import React, { Component } from 'react';
import Icon from 'bee-icon';

export default class TabHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {
  	let {index} = this.props;
    return (
      <div className="tab-header">
        <div onClick={() => this.props.onActive(this.props.item.serviceCode)} className={this.props.active ? 'tab-title-item active': 'tab-title-item'} title={this.props.item.name}>
            {this.props.item.title}
        </div>
		  {//index === 0 ? '' :
			  <Icon type="uf-close" onClick={() => this.props.onRemove(this.props.item.serviceCode)}/>}
      </div>
    );
  }
}
