import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { toJS } from 'mobx';
import _ from 'lodash';
import $ from 'jquery';
import { Provider, observer } from 'mobx-react';
import classNames from 'classnames';
import './../other/messenger';
import { listen } from './../other/home.global';
import LeftMenu from './LeftMenu';
import TabContent from './TabContent.js';
import TabHeader from './TabHeader.js';
import TabHeaderMore from './TabHeaderMore.js';
import TabAccBook from './TabAccBook';
import AccbookStore from './../stores/AccbookStore';
var accbookStore = AccbookStore;

const propTypes = {
	//cookies: instanceOf(Cookies).isRequired,
};
var timer = null;

@observer
class Container extends Component {
	constructor(props) {
		super(props);

		this.state = {
			menuData: this.props.menuItems,
			// 首页
			homePage: 'mywork',
			// 最大显示页签数
			maxLength: 10,
			// 默认首页数据
			defaultData: [{
				id: 'mywork',
				serviceCode: 'mywork',
				title: '首页',
				basePath: 'home_index.html#/default',
				desc: {
					accbook: true
				}
			}],
			// 页签列表数据
			tabList: [],
			// 当前页签
			currentCode: this.props.current.serviceCode||'mywork',
			// 更多页签数据
			moreList: [],
			// 是否显示更多页签
			moreIsShow: false,
			width: '',
			param:undefined//存储url参数
		};
		this.handleResize = this.handleResize.bind(this);
		this.changeOrOpenTab = this.changeOrOpenTab.bind(this);
		this.menuClick = this.menuClick.bind(this);
		this.messageCallback = this.messageCallback.bind(this);
		this.active = this.active.bind(this);
		this.closeAll = this.closeAll.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.remove = this.remove.bind(this);
		this.refreshCurrent = this.refreshCurrent.bind(this);
		this.accChange = this.accChange.bind(this);
	}

	componentDidMount() {
		let that = this;
		let { current } =this.props;
		if(!current['accBook']){
			current['accBook'] = accbookStore.getAccBook;
		}
		let defMenu = Object.assign([], current?[current]:that.state.defaultData);
		this.setState(
			{
				tabList: [...defMenu],
			});

		let windowWidth = $(window).width();
		let width = windowWidth - 350;
		that.setState({ width });

		// 监听窗口大小改变事件
		window.addEventListener('resize', this.handleResize);
		listen(this.messageCallback);
	}
	componentWillReceiveProps(props){
		let newTab = toJS(props.current);
		if (newTab.serviceCode !== this.state.currentCode) {
			//切换页签
			this.changeOrOpenTab(newTab);
		}else{
			//刷新当前页签
			this.refreshCurrent(newTab);
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}
	messageCallback (msg) {
		//这里分发消息, 目前只有打开菜单消息
		// this.openMsgTab(msg);
		console.log('othertabmsg',msg);
		//反序列化消息
		try {
			msg=JSON.parse(msg);
		} catch(error) {
			msg = { code: msg };
		}

		if (msg && msg.code) {
			msg.routerParams = msg.routerParams || '';
			msg.params = msg.params || {};
			//调试主动切换账簿, 例如下,需要在params参数对象主动增加accbook属性.
			//menu.params = {accbook:'9537C9CC-5D1B-41A0-B85E-8FF53906E235'};
			//设置一个值存参数
			this.setState({ param:msg },()=>{
				this.props.updateCurrent(msg.code);
			});
		}
	}
	handleResize(e) {
		let that = this;
		if (typeof timer === 'number') {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			let windowWidth = $(window).width();
			let width = windowWidth - 350;
			that.setState({ width });
		}, 200);
	}
	/**
	 * 设置当前选中的页签
	 * @param newTab
	 */
	changeOrOpenTab(newTab){
		let that = this;
		// 存在code就置为当前页面,不存在就增加
		let exist = _.find(that.state.tabList, menu => menu.serviceCode == newTab.serviceCode);
		let moreExist = _.find(that.state.moreList, menu => menu.serviceCode == newTab.serviceCode);

		if (exist) {
			// 判断是否有路由参数
			// 载入别的页面,设置旧的账簿
			this.changeTab(exist);
		}else if(moreExist){
			this.changeTab(moreExist,true);
		}else{
			this.openTab(newTab);
		}
	}

	/**
	 * 切换页签
	 * @param newTab
	 * @param isMore 是否是更多页签中页签
	 */
	changeTab(newTab, isMore) {
		console.log(this.state.param);
		newTab = Object.assign(newTab, this.state.param);
		let newState = { currentCode: newTab.serviceCode };
		if (isMore) {
			newState['moreIsShow'] = true;
		}
		this.setState(newState, () => {
		});
		//如果有路由参数,证明是页面内部跳转,不需要重设账簿
		if (this.state.param) {
			newTab.accBook = accbookStore.getAccBook;
			return true;
		}
		// reset accbook
		if (!newTab['accBook']) {
			this.refs.acc.setValue(accbookStore.getAccBook);
		} else if (accbookStore.getAccBook !== newTab.accBook) {
			accbookStore.accBook = newTab.accBook;
			this.refs.acc.setValue(newTab.accBook);
		}
	}
	/**
	 * 打开新页签
	 * @param newTab
	 */
	openTab(newTab){
		newTab= Object.assign(newTab,this.state.param);
		let tabField = 'tabList';
		let newState={ currentCode: newTab.serviceCode };
		if(this.state.tabList.length >= this.state.maxLength){
			tabField = 'moreList';
			newState['moreIsShow']=true;
		}
		newTab.accBook = accbookStore.getAccBook;
		// let j = -1;
		// let jl = this.state[tabField].length;
		let tl = this.state[tabField];
		tl.push(newTab);
		// let tl = [...this.state[tabField].slice(0, j), newTab, ...this.state[tabField].slice(j + 1, jl)];
		newState[tabField] = tl;
		this.setState(newState, () => {
		});
	}

	/**
	 * 单击菜单时,打开功能页,需处理地址参数
	 * @param  {Object} item 比如
	 * @return {[type]}      [description]
	 */
	menuClick(serviceCode,item) {
		this.setState({ param:undefined },()=>{
			this.props.updateCurrent(serviceCode);
		});
		// 记录点击历史
		// this.tabsStore.recordmenu(serviceCode);

		//隐藏iframe中的title样式,跨域实现不了
		// document.getElementById("myframe");
		// setTimeout(()=>{
		// let x = $('.iframe-container .tab-content-item .frame')[0]
		// var y=(x.contentWindow || x.contentDocument);
		// if (y.document){
		// 	y = y.document;
		// }
		// y.body.style.backgroundColor='#0000ff';
		// },200);
	}


// 账簿改变,刷新当前页
	refreshCurrent() {
		let tab = _.find(this.state.tabList, menu => menu.serviceCode == this.state.currentCode);
		if (tab) {
			if (this.state.currentCode === 'addvoucher') {
				tab.routerParams = '';
			}
			this.refreshTabList(tab, this.state.currentCode);
		} else {
			tab = _.find(this.state.moreList, menu => menu.serviceCode == this.state.currentCode);
			this.refreshMoreList(tab, this.state.currentCode);
		}
	}
	//刷新TabList
	refreshTabList(tab, code) {
		let newTab = Object.assign({}, tab);
		newTab.accBook = accbookStore.getAccBook;

		let j = _.findIndex(this.state.tabList, item => item.serviceCode == code);
		let jl = this.state.tabList.length;
		let tl = [];
		if (j == 0) {
			tl = [newTab, ...this.state.tabList.slice(1, jl)];
		} else if (j == jl) {
			tl = [...this.state.tabList.slice(0, j - 1), newTab];
		} else {
			tl = [...this.state.tabList.slice(0, j), newTab, ...this.state.tabList.slice(j + 1, jl)];
		}
		this.setState({ tabList: tl, currentCode: newTab.serviceCode }, () => {
		});
	}

	//刷新MoreList
	refreshMoreList(tab, code) {
		let newTab = Object.assign({}, tab);
		newTab.accBook = accbookStore.getAccBook;

		let i = _.findIndex(this.state.moreList, item => item.serviceCode == code);
		let il = this.state.moreList.length;
		let ml = [];
		if (i == 0) {
			ml = [newTab, ...this.state.moreList.slice(1, il)];
		} else if (i == il) {
			ml = [...this.state.moreList.slice(0, i - 1), newTab];
		} else {
			ml = [...this.state.moreList.slice(0, i), newTab, ...this.state.moreList.slice(i + 1, il)];
		}

		this.setState({ moreIsShow: true, moreList: ml, currentCode: newTab.serviceCode }, () => {
		});
	}
	active(code) {
		if (code == 'closeAll') {
			this.closeAll();
			return;
		}
		this.menuClick(code);
	}
	closeAll() {
		// 重置为首页并隐藏More菜单
		let that = this;
		this.setState(
			{
				currentCode: that.state.homePage,
				moreIsShow: false,
				tabList: [...that.state.defaultData],
				moreList: [],
			});
	}

	removeItem(code) {
		let that = this;
		//最后一个页签不能删除
		if (this.state.tabList.length <= 1) return;
		let index = _.findIndex(this.state.tabList, item => item.serviceCode == code);
		let list = _.reject(this.state.tabList, { serviceCode: code });
		if (list.length <= index) {
			index = list.length - 1;
			index < 0 ? index = 0 : null;
		}
		// console.log(JSON.stringify(list));
		this.setState({ tabList: list }, () => {
			if (this.state.tabList.length >= index && this.state.currentCode == code) {
				that.active(this.state.tabList[index].serviceCode);
			}
		});
	}

	remove(code) {
		// More菜单有数据,先从More里移动第一条到Tab的最后,再进行删除
		if (this.state.moreList.length > 0) {
			let newMore = [...this.state.moreList];
			let newTab = [...this.state.tabList];
			let moveItem = newMore.shift();
			newTab.push(moveItem);
			this.setState({ tabList: [...newTab], moreList: [...newMore], moreIsShow: !(newMore.length <= 0) },
				() => {
					this.removeItem(code);
				});
		} else {
			this.removeItem(code);
		}
	}

	accChange(value) {
		// 改变账簿时候,把全局账簿变量修改(重构:重命名为当前账簿)
		accbookStore.accBook = value;
		// console.log(`accbook:${value}`);
		setTimeout(this.refreshCurrent, 100);
		// 刷新当前的Tab页
	}

	render() {
		const { tabList, moreList } = this.state;
		const { menuItems, current, className } = this.props;
		let moreTab =
			(<TabHeaderMore
				onActive={this.active}
				currentCode={this.state.currentCode}
				moreList={this.state.moreList}
				isShow={this.state.moreIsShow}
			/>);

		return (
			<div className={ classNames('ficloud-bench', { [`${className}`]: className })}>
				{
					<TabAccBook ref="acc" onChange={this.accChange} />
				}
				<LeftMenu menus={menuItems} current={current} onMenuClick={this.menuClick} ref="menu"/>
				<div className="main-tab" style={{ width: this.state.width }}>
					{tabList.map((item,index) => (<TabHeader
						key={`tab_${item.serviceCode}`}
						item={item}
						onActive={this.active}
						active={this.state.currentCode == item.serviceCode}
						onRemove={this.remove}
					/>))}
					{moreTab}
				</div>
				<div className="iframe-container">
					<div className="clear">
						{tabList.map((item,index) => (<TabContent
							key={`tabContent_${item.serviceCode+index}`}
							item={item}
							onActive={this.active}
							active={this.state.currentCode == item.serviceCode}
							onRemove={this.remove}
						/>))}
						{moreList.map((item,index) => (<TabContent
							key={`tabContentMore_${item.serviceCode+index}`}
							item={item}
							onActive={this.active}
							active={this.state.currentCode == item.serviceCode}
							onRemove={this.remove}
						/>))}
					</div>
				</div>
			</div>
		);
	}
}

Container.propTypes = propTypes;

export default Container;
