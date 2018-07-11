import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import Config from '../config';
var timer = null;
@observer
export default class TabContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            frameHeight: '620px'
        };
    }

    handleResize (e){
      if (typeof timer === 'number') {
        clearTimeout(timer);
      }
      timer = setTimeout(()=>{
        let clientHeight = $(window).height();
        let height = clientHeight - 0;
        this.setState({ frameHeight: height });
      },200);
    }

    componentDidMount() {
        // 监听窗口大小改变事件
        this.handleResize();
        window.addEventListener('resize', this.handleResize);

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        const { active, item } = this.props;

        //地址参数, 没有设置为空对象
        if (typeof(item.params) == 'undefined') {
            item.params = {};
        }

        //路由参数, 没有设置为空串
        if (typeof(item.routerParams) == 'undefined') {
            item.routerParams = '';
        }

        const pstr = 'version=' + Config.VERSION + '&accbook=' + item.accBook + '&code=' + item.code + '&params=' + encodeURIComponent(JSON.stringify(item.params));
        const uri = item.url?item.url:'';
        const connStr = item.basePath.indexOf('?') >= 0 ? '&' : '?';
        const url = item.basePath + connStr + pstr + uri + item.routerParams;

        return (
            <div className={active ? 'tab-content-item active': 'tab-content-item'} style={{ height: this.state.frameHeight }}>
                <iframe src={url} id={item.code} name={item.code} className="frame" />
            </div>
        );
    }
}
