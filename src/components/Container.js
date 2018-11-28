import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionAccbook from '../actions/actionAccbook';
import _ from 'lodash';
import classNames from 'classnames';
import './../other/messenger';
import { listen } from './../other/home.global';
import LeftMenu from './LeftMenu';
import TabContent from './TabContent.js';
import TabHeader from './TabHeader.js';
import TabHeaderMore from './TabHeaderMore.js';
import TabAccBook from './TabAccBook';
import { findPath } from '../utils/findPath';

var timer = null;

class Container extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isAccBook:false,
			menuData: this.props.menuItems,
			homeUrl:'',
			// 首页
			homePage: '',
			// 最大显示页签数
			maxLength: 8,
			// 没有默认数据默认首页数据
			defaultData: [],
			// 页签列表数据
			tabList: [],
			// 当前页签
			currentCode: '',
			// 更多页签数据
			moreList: [],
			// 是否显示更多页签
			moreIsShow: false,
			width: 1200,
			showLeft:true,
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
		this.formartAccbook = this.formartAccbook.bind(this);
		this.loadCurrent = this.loadCurrent.bind(this);
	}

	componentDidMount() {
		let that = this;
		let { current } =that.props;
		if (this.props.env) {
			let url = this.props.getDefaultUrl(this.props.env) + '/home_index.html';
			this.setState({homeUrl: url});
		}
		let { width,tabLength,height } = this.getWidth();
		that.setState({
			currentCode:'',
			width: width,
			maxLength: tabLength,height:height
		});
		if(current&&current.serviceCode){
			this.loadCurrent(current.serviceCode);
		}
		this.props.queryAllAcc(this.props.env,()=>{
			if(!current['accBook']){
				current['accBook'] = this.props.accBook;
			}
			this.loadCurrent(current.serviceCode,true);
		});
		this.props.queryDefaultAcc(this.props.env,()=>{
			if(!current['accBook']){
				current['accBook'] = this.props.accBook;
			}
			this.loadCurrent(current.serviceCode,true);
		});
		// 监听窗口大小改变事件
		window.addEventListener('resize', this.handleResize);
		listen(this.messageCallback);
	}
	componentWillReceiveProps(nextProps){
		if ((!this.props.current.serviceCode)) {
			let newTab = nextProps.current;
			if (nextProps.accBook && newTab.accBook !== nextProps.accBook) {
				newTab.accBook = nextProps.accBook;
			}
			this.setState({ currentCode: newTab.serviceCode });
			// this.loadCurrent(newTab.serviceCode);
		}
	}

	loadCurrent = (serviceCode,needAccBook) => {
		if (needAccBook) {
			serviceCode = this.state.currentCode;
		}
		const menuPath = findPath(this.props.menuItems, 'children', 'serviceCode', serviceCode);
		let newTab = menuPath.slice(-1)[0];
		if (newTab) {
			newTab = Object.assign(newTab, newTab.service);
			if(needAccBook){
				newTab['accBook'] = this.props.accBook;
			}
			newTab['extendDesc'] = newTab.ext1;
			newTab['title'] = newTab.serviceName;
		} else {
			return;
		}
		this.formartAccbook(newTab);
		if(newTab.serviceCode){
			if (newTab.serviceCode !== this.state.currentCode || needAccBook || this.state.tabList.length === 0) {
				//切换页签
				this.changeOrOpenTab(newTab);
			}else{
				//刷新当前页签
				this.refreshCurrent(newTab);
			}
		}
	}
	formartAccbook=(current)=>{
		if (!current.extendDesc) {
			this.setState({ isAccBook:false });
		} else {
			let extendDesc =current.extendDesc;
			if(extendDesc.indexOf('\\')>-1){
				extendDesc = extendDesc.replace(/\\/g, '');
			}
			if(extendDesc.indexOf('&quot;')>-1){
				extendDesc = extendDesc.replace(/&quot;/g, '"');
			}
			try {
				extendDesc = JSON.parse(extendDesc);
				this.setState({ isAccBook:extendDesc['accbook'] });
			} catch(e) {
				console.log(e);
			}
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}
	test=()=>{
		let time = Date.now();
		let msg = { 'code':'addvoucher','params':{ 'v':time },'routerParams':'/C6CB6F71-163A-49FF-B50B-6DF0A9BF4C66' };
		this.messageCallback(JSON.stringify(msg));
	}
	messageCallback (msg) {
		//这里分发消息, 目前只有打开菜单消息
		// this.openMsgTab(msg);
		// console.log('othertabmsg',msg);
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
				this.loadCurrent(msg.code);
			});
		}
	}
	handleResize(e) {
		let that = this;
		if (typeof timer === 'number') {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			let { width,tabLength,height }=this.getWidth();

			that.setState({ width:width,
				maxLength:tabLength ,height:height });
			if (width === this.state.width) {
				return;
			}
			// 还需要重设tablist
			let tabListLength = this.state.tabList.length;
			let moreListLength = this.state.moreList.length;
			if (tabListLength > tabLength) {
				let moreList = _.concat(_.drop(this.state.tabList, tabLength), this.state.moreList);
				let tabList = _.dropRight(this.state.tabList, tabListLength - tabLength);
				this.setState({ moreList:moreList,tabList:tabList,moreIsShow:true });
			}else{
				if (moreListLength > 0) {
					let changeLength = tabLength - tabListLength >= moreListLength ? moreListLength : tabLength - tabListLength;
					let tabList = _.concat(this.state.tabList, _.dropRight(this.state.moreList, moreListLength - changeLength));
					let moreList = _.drop(this.state.moreList, changeLength);
					this.setState({ moreList:moreList,tabList:tabList,moreIsShow:moreList.length>0 });
				}
			}
		}, 200);
	}

	getWidth = () => {
		let windowWidth = window.innerWidth;
		let windowHeight = window.innerHeight-86;//头的高度是86
		let width = windowWidth - 230;//减去页面左侧菜单宽度
		let tabLength = Math.floor(width / 160);
		if (width % 160 < 19 ) {//更多条件的宽度是19&& this.state.moreList.length > 0
			tabLength = tabLength - 1 > 0 ? tabLength - 1 : 0;
		}
		return{ width:width,tabLength:tabLength,height:windowHeight };
	}
	/**
	 * 设置当前选中的页签
	 * @param newTab
	 */
	changeOrOpenTab(newTab){
		let that = this;
		// 存在code就置为当前页面,不存在就增加
		let exist = _.find(that.state.tabList, menu => menu.serviceCode === newTab.serviceCode);
		let moreExist = _.find(that.state.moreList, menu => menu.serviceCode === newTab.serviceCode);

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
		if(this.state.param){
			newTab = Object.assign(newTab, this.state.param);
		}
		let newState = { currentCode: newTab.serviceCode };
		if (isMore) {
			newState['moreIsShow'] = true;
		}
		this.setState(newState);
		//如果有路由参数,证明是页面内部跳转,不需要重设账簿
		if (this.state.param) {
			newTab.accBook = this.props.accBook;
			return true;
		}
		// reset accbook
		if (!newTab['accBook']) {
		} else if (this.props.accBook !== newTab.accBook) {
			this.props.getAccBookObj(newTab.accBook,this.props.accBookData);
			// accbookStore.accBook = newTab.accBook;
		}

	}
	/**
	 * 打开新页签
	 * @param newTab
	 */
	openTab(newTab){
		if(!newTab.serviceCode){
			return;
		}
		if(this.state.param){
			newTab = Object.assign(newTab, this.state.param);
		}
		let tabField = 'tabList';
		let newState={ currentCode: newTab.serviceCode };
		if(this.state.tabList.length >= this.state.maxLength){
			tabField = 'moreList';
			newState['moreIsShow']=true;
		}
		newTab.accBook = this.props.accBook;
		let tl = this.state[tabField];
		tl.push(newTab);
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
			setTimeout(this.loadCurrent(serviceCode),100);
			// this.loadCurrent(serviceCode);
		});
	}


// 账簿改变,刷新当前页
	refreshCurrent(newTab,accBook) {
		let tab = _.find(this.state.tabList, menu => menu.serviceCode == this.state.currentCode);
		if (tab) {
			if (newTab && newTab.url) {
				tab['url'] = newTab.url;
			}
			if(this.state.param){
				tab = Object.assign(tab, this.state.param);
			}
			this.refreshTabList(tab, this.state.currentCode,accBook);
		} else {
			tab = _.find(this.state.moreList, menu => menu.serviceCode == this.state.currentCode);
			if(tab){
				if (newTab) {
					tab['url'] = newTab.url;
				}
				if(this.state.param){
					tab = Object.assign(tab, this.state.param);
				}
				this.refreshMoreList(tab, this.state.currentCode,accBook);
			}
		}
	}
	//刷新TabList
	refreshTabList(tab, code,accBook) {
		let newTab = Object.assign({}, tab);
		// newTab.accBook = accbookStore.getAccBook;
		if (typeof accBook === 'string'){
			newTab.accBook = accBook || this.props.accBook;
		}
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
	refreshMoreList(tab, code,accBook) {
		let newTab = Object.assign({}, tab);
		newTab.accBook = accBook || this.props.accBook;

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
				isAccBook:false,
				currentCode: that.state.homePage,
				moreIsShow: false,
				tabList: [],
				moreList: [],
			});
		// this.menuClick('');//如果关闭所有，会设置为默认服务,所以暂时不设置
	}

	removeItem(code) {
		let that = this;
		//最后一个页签不能删除
		if (this.state.tabList.length <= 1) {
			// this.props.isAccBook = false;
			this.setState({isAccBook:false});
		}
		let index = _.findIndex(this.state.tabList, item => item.serviceCode == code);
		let list = _.reject(this.state.tabList, { serviceCode: code });
		if (list.length <= index) {
			index = list.length - 1;
			index < 0 ? index = 0 : null;
		}
		// console.log(JSON.stringify(list));
		this.setState({ tabList: list });
		if (list.length > 0 && list.length >= index && this.state.currentCode === code) {
			that.active(list[index].serviceCode);
		}
		// this.setState({ tabList: list }, () => {
		// 	if (this.state.tabList.length >= index && this.state.currentCode == code) {
		// 		if(this.state.tabList.length > 0){
		// 			that.active(this.state.tabList[index].serviceCode);
		// 		}else{
		// 			// that.active('');
		// 		}
		// 	}
		// });
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
		this.props.updateAccbook(value);
		setTimeout(this.refreshCurrent(undefined,value && value.id ? value.id : ''), 100);
		// 刷新当前的Tab页
	}
	onToggle=()=>{
		this.setState({ showLeft:!this.state.showLeft });

	}

	render() {
		const { tabList, moreList,height,showLeft } = this.state;
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
					<TabAccBook ref="acc" onChange={this.accChange} accBookName={this.props.accBookName} accBookObj={this.props.accBookObj} isAccBook={this.state.isAccBook} accBookData ={this.props.accBookTree} accBook={this.props.accBook} className={showLeft?'':'showLeft'}/>
				}
				<LeftMenu menus={menuItems} current={current} onMenuClick={this.menuClick} onToggle={this.onToggle} ref="menu" showLeft={showLeft} height={height}/>
				<div className={showLeft?'main-tab':'main-tab showLeft'} style={{ width: this.state.width }}>
					{tabList.map((item,index) => (<TabHeader
						key={`tab_${item.serviceCode}`}
						item={item}
						index={index}
						onActive={this.active}
						active={this.state.currentCode === item.serviceCode}
						onRemove={this.remove}
					/>))}
					{moreTab}
				</div>
				<div className={showLeft?'iframe-container':'iframe-container showLeft'}>
					<div className="clear">
						{tabList.map((item,index) => (<TabContent
							homeUrl = {this.state.homeUrl}
							key={`tabContent_${item.serviceCode}`}
							item={item}
							onActive={this.active}
							active={this.state.currentCode === item.serviceCode}
							onRemove={this.remove}
						/>))}
						{moreList.map((item,index) => (<TabContent
							homeUrl = {this.state.homeUrl}
							key={`tabContentMore_${item.serviceCode}`}
							item={item}
							onActive={this.active}
							active={this.state.currentCode === item.serviceCode}
							onRemove={this.remove}
						/>))}
					</div>
				</div>
			</div>
		);
	}
}

// export default Container;

//影射Store的State到App的Props, 这里用做数据
// function mapStateToProps(state) {
// 	return state.accbook;
// }
const mapStateToProps = state => ({ ...state.accbook,
	accbook: state.accbook,
	accBookTree: state.accbook.accBookTree,
	accBookData: state.accbook.accBookData,
	accBook: state.accbook.accBook,
	accBookObj:state.accbook.accBookObj,
	accBookName:state.accbook.accBookName
});
//影射Store的dispath到App的Props,这里用做操作(事件)
function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionAccbook, dispatch);
}

//练接是中间组件react-redux功能,用于把React的Props, State, Event和Redux的关联
export default connect(mapStateToProps, mapDispatchToProps)(Container);
