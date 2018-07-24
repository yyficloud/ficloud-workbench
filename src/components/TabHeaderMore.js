import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import Menu from 'bee-menus';
import Icon from 'bee-icon';
import Dropdown from 'bee-dropdown';
const { Item } = Menu;

@observer
export default class TabHeaderMore extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }
	onVisibleChange(){}
    render() {
        let { isShow, currentCode, onActive, moreList } = this.props;
        // console.log(moreList);
		const menu1 = (
			<ul className={'u-dropdown-menu more'}>
				{
					moreList.map((item,index) => {
						return (<li key={index} onClick={() => onActive(item.serviceCode)}><span>{item.title}</span></li>);
					})
				}
				<li key="closeall" onClick={() => onActive('closeAll')}><span>关闭全部标签页</span></li>
			</ul>
		);
        return (
            <div className="main-tab-more" style={{ display: isShow? 'block': 'none' }}>
				<Dropdown
					trigger={['click']}
					overlay={menu1}
					animation="slide-up"
					onVisibleChange={this.onVisibleChange}
				>
					<div className={'tab-header more'}>
						<Icon type="uf-arrow-up" />
					</div>
				</Dropdown>
            </div>
        );
    }
}
