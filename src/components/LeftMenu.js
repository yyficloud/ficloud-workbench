import React, { Component } from 'react';
// import { Menu,Icon } from 'tinper-bee';
import Menu from 'bee-menus';
import Icon from 'bee-icon';
import { findPath } from '../utils/findPath';
const { Item } = Menu;
const SubMenu = Menu.SubMenu;
//isTop:判断是否是一级菜单
function makeMenus(menus, isTop, i) {
	i++;
	let result = [];
	menus.forEach(({ children, menuItemId: id, menuItemIcon, menuItemName: name }) => {
		if (children && children.length) {
			result.push(
				<SubMenu
					className={'sideBarMenu'}
					key={id}
					style={{ fontSize: '14px', background: 'red' }}
					title={
						<span className={`item_${i}`}>
              <Icon type="forward2" />
							{isTop ? <img src={menuItemIcon} className={'menuItem'} /> : null}
							{name}
            </span>
					}>
					{makeMenus(children, false, i)}
				</SubMenu>
			);
		} else {
			result.push(
				<Item key={id} style={isTop ? { fontSize: '14px' } : null}>
          <span className={`item_${i} ${'last_item'}`}>
            {isTop ? <img src={menuItemIcon} className={'menuItem'} /> : null}
			  {name}
          </span>

				</Item>
			);
		}
	});
	return result;
}


export default class LeftMenu extends Component {

	constructor(props) {
		super(props);
		const { openKeys, selectedKeys } = this.getOpenKeys(props);
		this.state = {
			openKeys,     // menu 展开的数组集合
			selectedKeys, // 当前选中的菜单项 key 数组
		};
		this.handleClick = this.handleClick.bind(this);
		this.onOpenChange = this.onOpenChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.current.menuItemId !== this.props.current.menuItemId) {
			const { openKeys } = this.state;
			const { openKeys: newOpenKeys, selectedKeys } = this.getOpenKeys(nextProps);
			newOpenKeys.forEach((key) => {
				if (openKeys.indexOf(key) === -1) {
					openKeys.push(key);
				}
			});
			this.setState({
				openKeys: [...openKeys],
				selectedKeys,
			});
		}
	}

	handleClick({ key: id }) {
		const {
			menus,
			current: {
				serviceCode: curServiceCode,
			},
		} = this.props;
		let menuPath = findPath(menus, 'children', 'menuItemId', id);
		menuPath= menuPath.slice(-1);
		const { serviceCode } = menuPath[0];
		if (serviceCode !== curServiceCode) {
			this.props.onMenuClick(serviceCode);
		}
	}

	onOpenChange (openKeys) {
		this.setState({
			openKeys,
		});
	}

	getOpenKeys(props) {
		const { menus, current: { menuItemId: id } } = props;
		const menuPath = findPath(menus, 'children', 'menuItemId', id);
		const openKeys = menuPath.slice(0, -1).map(({ menuItemId }) => {
			return menuItemId;
		});
		const selectedKeys = menuPath.slice(-1).map(({ menuItemId }) => {
			return menuItemId;
		});
		return {
			openKeys,
			selectedKeys,
		};
	}

	render() {
		const { menus } = this.props;
		const { openKeys, selectedKeys } = this.state;
		const isTop = true;//标识是否是一级菜单
		return (
			<div className={'sideBar'} >
				<Menu
					onClick={this.handleClick}
					style={{ width: '100%' }}
					onOpenChange={this.onOpenChange}
					openKeys={openKeys}
					selectedKeys={selectedKeys}
					mode="inline"
					className={'sideMainMenu'}>
					{makeMenus(menus, isTop, 0)}
				</Menu>
			</div>
		);
	}
}
