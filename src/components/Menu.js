/**
 * 左侧菜单
 */
import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import '../other/messenger';
import { listen,GetQueryString } from '../other/home.global';
var timer = null;
@observer
export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: null,
            h : 0,
            showUp:false,
            showDown:false
        };
    }

    componentDidMount() {
        //监听子页面消息回调
		listen(this.messageCallback);
        // 监听窗口大小改变事件
        window.addEventListener('resize', this.handleResize2);
        this.handleResize2();
    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize2);
    }
    messageCallback (msg) {
        //这里分发消息, 目前只有打开菜单消息
        this.openMsgTab(msg);
    }
//设置菜单区域高度
    handleResize2 (e){
      if (typeof timer === 'number') {
        clearTimeout(timer);
      }
      timer = setTimeout(()=>{
        let clientHeight = $(window).height();                      // 默认窗口高度
        let scrollParent = clientHeight - 4;                      // 可视区域高度
        $('.sidenav-container-wrap').css({ 'height': scrollParent + 'px' });
      },100);
    }
    //预留，菜单滚动，上下箭头是否显示
    handleScroll (e){
        // this.setState({})
    }
    handleMouseOver(index,e){
        e.stopPropagation();
        e.preventDefault();
        this.setState({ active:index });
        if ($('#menu-child-list-' + index).height() == 0){
            let currentTag = $(e.target).closest('li.nav-item');
            let height = currentTag.offset().top;
            $('#menu-child-list-' + index).css({ 'top': height + 'px' });
            // console.log($('#menu-child-list-' + index).height());
            //高度>可视区域的高度，就变bottom
            setTimeout(() => {
                let eleHeight = $('#menu-child-list-' + index).height();
                let windowHeight = $(window).height();
                if ((height + eleHeight)>windowHeight) {
                    $('#menu-child-list-' + index).css({ 'top': (height - eleHeight + 70) + 'px' });
                }
            }, 3);
        }
    }

    handleMouseOut(tag,e){
        this.setState({ active:null });
    }

  openNewTab (menu) {
    let url = menu.url;
    let uriArr = url.split('#');
    if(uriArr.length>=2){
        url = uriArr[1];
        url=location.protocol + '//' + location.host +url+ '&'+new Date().getTime();
    }
      window.open(url);
      // window.open(menu.basePath,'','menubar=no,status=no,titlebar=no,toolbar=no,left=0')
  }


    //主页面根据消息驱动菜单
    openMsgTab (msg) {
        console.log(msg);
        //反序列化消息
        try {
            msg=JSON.parse(msg);
        } catch(error) {
            msg = { code: msg };
        }

        let menu = {};
        if(!msg.isCheckList){
            menu = this.props.tabsStore.getMenuItem(msg.code);
        }else{
            menu = JSON.parse(JSON.stringify(msg));
        }

        // console.log(JSON.stringify(menu))
        if (menu) {
            menu.routerParams = msg.routerParams || '';
            menu.params = msg.params || {};
            //调试主动切换账簿, 例如下,需要在params参数对象主动增加accbook属性.
            //menu.params = {accbook:'9537C9CC-5D1B-41A0-B85E-8FF53906E235'};
            this.openTab(menu);
        }
    }

    render() {
        let _this = this;
        return (
            <div className="sidenav-wrap">
            <div className="sidenav-container-wrap">
                <section className="sidenav sidenav-container noprint" id="sidenav" onScroll={this.handleScroll}>
                    <div className="sidenav-body">
                        <ul className="nav" style={_this.state.navStyle}>
                            {
                                this.props.menuData.map((menu, index) =>{
                                    let childrenLength = menu.children.length;
                                    let needSecond = childrenLength >= 5;
                                    let split = needSecond ? Math.ceil(childrenLength / 2) : childrenLength;
                                    let firstArr= menu.children.slice(0,split);
                                    let secondArr = menu.children.slice(split);
                                    return menu.isMenu===false ? '' : (!menu.virtual ?
                                    <li className="nav-item" key={menu.code+index}>
                                        <a href="#" key={'a_' + menu.code+index} onClick={() => this.props.onMenuClick(menu)}>
                                            <div className="nav-icon">
                                                <i className={'iconfont icon-nav-mywork'} />
                                            </div>
                                            <div className="nav-text">
                                                <span>{menu.name}</span>
                                            </div>
                                        </a>
                                    </li> :
                                    <li className="nav-item" key={menu.code} onMouseOver={this.handleMouseOver.bind(this,index)}>
                                        <div className="nav-icon">
                                            <i className={`iconfont icon-nav-${menu.code}`} />
                                        </div>
                                        <div className="nav-text">
                                            <span>{menu.name}</span>
                                        </div>
                                    </li>);
                                })
                            }
                        </ul>
                    </div>
                    <div className="sidenav-footer">
                        {
                            //<ul className='up-or-down' style={{ display: 'block' }}>
                            //<li className='to-up' onClick={this.toScroll.bind(this,'up')}>
                            //    <span className='glyphicon glyphicon-chevron-up' />
                            //</li>
                            //<li className='to-down' onClick={this.toScroll.bind(this,'down')}>
                            //    <span className='glyphicon glyphicon-chevron-down' />
                            //</li>
                        //</ul>
                        }
                        <div className="logo"><i className="iconfont icon-logo" /></div>
                    </div>
                </section>
            </div>
                <ul>
                    {
                        this.props.menuData.map((menu, index) =>{
                            let childrenLength = menu.children.length;
                            let needSecond = childrenLength >= 5;
                            let split = needSecond ? Math.ceil(childrenLength / 2) : childrenLength;
                            let firstArr= menu.children.slice(0,split);
                            let secondArr = menu.children.slice(split);
                            return !menu.virtual ?
                                '' :
                                <ul id={'menu-child-list-'+index}
                                    className={this.state.active==index?(needSecond ? 'menu-child-list second' : 'menu-child-list'):'hidden'}>
                                        <div className={needSecond ? 'fl' : ''}>
                                            {firstArr.map((child, index) => {
                                                return (<li key={child.code}
                                                           onClick={child.openview==='blank'?()=>this.openNewTab(child):() => this.props.onMenuClick(child)}>
                                                    <a href="#">{child.name}</a>
                                                </li>);
                                            })
                                            }
                                        </div>
                                        {needSecond ? <div className="fr">
                                                {secondArr.map((child, index) => {
                                                    return (<li key={child.code}
                                                               onClick={() => this.props.onMenuClick(child)}>
                                                        <a href="#">{child.name}</a>
                                                    </li>);
                                                })
                                                }
                                            </div> : ''}
                                    </ul>;
                        })
                    }
                </ul>
            </div>
        );
    }
}
