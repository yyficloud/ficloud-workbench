import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
var timer = null;
@observer
export default class TabContent extends Component {
    constructor(props) {
        super(props);
        this.handleResize = this.handleResize.bind(this);
        this.state = {
            frameHeight: '620px'
        };
    }

    handleResize (e){
      if (typeof timer === 'number') {
        clearTimeout(timer);
      }
      timer = setTimeout(()=>{
        let clientHeight = window.innerHeight;
        let height = clientHeight - 100;
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
        const { homeUrl,active, item } = this.props;

        //地址参数, 没有设置为空对象
        if (typeof(item.params) == 'undefined') {
            item.params = {};
        }

        //路由参数, 没有设置为空串
        if (typeof(item.routerParams) == 'undefined') {
            item.routerParams = '';
        }
		const version = process.env.NODE_VERSION || 'develop';
		const pstr = 'version=' + version + '&serviceCode=' + item.serviceCode+ '&accbook=' + item.accBook + '&code=' + item.serviceCode + '&params=' + encodeURIComponent(JSON.stringify(item.params));
        let uri = item.url?item.url:'';
        let hash = '/default';
        let uriArr = uri.split('#');

		if(uriArr.length>=1){
			uri = uriArr[0] || homeUrl;
			hash = uriArr[1];
		}
		const connStr = uri.indexOf('?') >= 0 ? '&' : '?';
        const url = uri + connStr + pstr +'#'+ hash + item.routerParams;

        return (
            <div key ={item.code} className={active ? 'tab-content-item active': 'tab-content-item'} style={{ height: this.state.frameHeight }}>
                <iframe src={url} id={item.code} name={item.code} className="frame" />
            </div>
        );
    }
}
