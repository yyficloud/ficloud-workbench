import React, { Component } from 'react';
var timer = null;
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
	formartAccbook=(current)=>{
		if (!current.extendDesc) {
			return false;
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
				return extendDesc['accbook'];
			} catch(e) {
				console.log(e);
			}
		}
	}
	replaceRegex = (url, item) => {
		try {
			let needReplace = url.match(/\{[^\}]+\}/);//{} 花括号
			if (!needReplace) {
				return url;
			}
			if (typeof window.diworkContext === 'function') {//typeof window.diworkContext === 'function'
				const diworkContext = window.diworkContext();
				// const diworkContext = {"tenantid":"hg35emfb","userid":"31829413-a7c7-4368-9461-cffb73142109","theme":"","username":"","locale":"zh_CN","timezone":"","appcode":"diwork","profile":"online","multilist":"[{\"default\":true,\"dislpayName\":\"简体中文\",\"enabled\":true,\"id\":\"c405bc04-37ea-4313-a98f-3b0c59b952a2\",\"langCode\":\"zh_CN\",\"langSequence\":1},{\"default\":false,\"dislpayName\":\"English\",\"enabled\":true,\"id\":\"ce73e0f1-0677-49fa-ba17-1110bbb9d599\",\"langCode\":\"en_US\",\"langSequence\":2},{\"default\":false,\"dislpayName\":\"繁体中文\",\"enabled\":true,\"id\":\"a5f747a6-800e-476e-8b3c-79fa6c1f1aba\",\"langCode\":\"zh_TW\",\"langSequence\":3}]"}//window.diworkContext();
				if (needReplace.length > 0) {
					let length = needReplace.length;
					for (var i, i = 0; i < length; i++) {
						needReplace[i] = needReplace[i].replace('{', '').replace('}', '');
						let key = needReplace[i];
						if (needReplace[i] == 'tenantId') {
							key = 'tenantid';
						}
						if (diworkContext[key]) {
							url = url.replace('{' + needReplace[i] + '}', diworkContext[key]);
						}
					}
				}
			} else {
				url = url.replace('{locale}', 'zh_CN');
				url = url.replace('{tenantId}', item.tenantId || '');
			}
		} catch (e) {

		}
		return url;
	}
    render() {
        const { homeUrl,active, item } = this.props;
		const isAccBook = this.formartAccbook(item);
        //地址参数, 没有设置为空对象
        if (typeof(item.params) == 'undefined') {
            item.params = {};
        }

        //路由参数, 没有设置为空串
        if (typeof(item.routerParams) == 'undefined') {
            item.routerParams = '';
        }
		const version = process.env.NODE_VERSION || 'develop';
		const pstr = 'version=' + version + '&serviceCode=' + item.serviceCode + '&accbook=' + item.accBook + '&showacc=' + isAccBook + '&code=' + item.serviceCode + '&params=' + encodeURIComponent(JSON.stringify(item.params));
        let uri = item.url?item.url:'';
        let hash = '/default';
        let uriArr = uri.split('#');

		if(uriArr.length>=1){
			uri = uriArr[0] || homeUrl;
			hash = uriArr[1];
		}
		let connStr = '?';
		if (uri.indexOf('?') >= 0) {
			connStr = '&';
		}
		uri = this.replaceRegex(uri,item);
		hash = this.replaceRegex(hash,item);
		let url = uri + connStr + pstr + '#' + hash + item.routerParams;
        return (
            <div key ={item.code} className={active ? 'tab-content-item active': 'tab-content-item'} style={{ height: this.state.frameHeight }}>
                <iframe src={url} id={item.code} name={item.code} className="frame" />
            </div>
        );
    }
}
