import React, { Component } from 'react';
import Menu from 'bee-menus';
import Icon from 'bee-icon';
import { findPath } from '../utils/findPath';
const { Item } = Menu;
const SubMenu = Menu.SubMenu;
//isTop:判断是否是一级菜单
function makeMenus(menus, isTop, i) {
	function formartIsshow (service) {
		if (!service) {
			return true;
		}
		let extendDesc = service.ext1;
		if (!extendDesc) {
			return true;
		}
		if (extendDesc.indexOf('\\') > -1) {
			extendDesc = extendDesc.replace(/\\/g, '');
		}
		if (extendDesc.indexOf('&quot;') > -1) {
			extendDesc = extendDesc.replace(/&quot;/g, '"');
		}
		try {
			extendDesc = JSON.parse(extendDesc);
			return extendDesc['isshow'];
		} catch (e) {
			console.log(e);
			return true;
		}
	}
	function childIsshow (children) {
		let flag = true;
		if (children && children.length){
			for(let i = 0;i<children.length;i++){
				if(!formartIsshow(children[i].service)){
					flag = false;
					break;
				}
			}
		}
		return flag;
	}
	i++;
	let result = [];
	menus.forEach(({ children, menuItemId: id, menuItemIcon, menuItemName: name,service: service}) => {
		if (children && children.length) {
			result.push(
				<SubMenu
					className={'sideBarMenu'}
					key={id}
					style={{ fontSize: '14px', background: 'red' }}
					title={
						<span className={`item_${i}`}>
              <Icon type="uf-arrow-right" />
							{isTop ? <img src={menuItemIcon} className={'menuItem'} /> : null}
							{name}
            </span>
					}>
					{makeMenus(children, false, i)}
				</SubMenu>
			);
		} else {
			let isShow = formartIsshow(service);
			if (isShow !== false) {
				result.push(
					<Item key={id} style={isTop ? { fontSize: '14px' } : null}>
          <span className={`item_${i} ${'last_item'}`} title={name}>
            {isTop ? <img src={menuItemIcon} className={'menuItem'} /> : null}
			  {name}
          </span>

					</Item>
				);
			}
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
	onToggle=()=>{
		this.props.onToggle();
	}
	render() {
		const { menus,height,showLeft } = this.props;
		const { openKeys, selectedKeys } = this.state;
		const isTop = true;//标识是否是一级菜单
		return (
			<div className={showLeft ? 'sideBar' : 'sideBar showLeft'}>
				<section onClick={!showLeft?this.onToggle:undefined}
					className={showLeft?'sideBar-title':'sideBar-title showLeft'} >
					{showLeft?'导航':''}
					{
						showLeft?<Icon type={'uf-close'} title="隐藏菜单" onClick={this.onToggle}/>:
							<Icon type={'uf-navmenu'} title="显示菜单"/>
					}
				</section>
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
