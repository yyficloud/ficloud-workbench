/* eslint react/prop-types: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import FinanceCloud from 'ficloud-workbench';
import './example.less';
import { findPath } from '../../src/utils/findPath';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.updateCurrent=this.updateCurrent.bind(this);
		this.state = {
			'menuItems':[
				{
					'createTime':1531363982000,
					'modifiedTime':1531363982000,
					'ts':1531363982000,
					'creator':'530b1b30-c7da-45e8-913f-a47cb5c0ea64',
					'modifier':'530b1b30-c7da-45e8-913f-a47cb5c0ea64',
					'tenantId':'vspcvrrj',
					'menuItemId':'81ce9334-2c2d-4741-9b77-22549d360dc6',
					'menuItemName':'首页',
					'menuItemCode':'yzbmenu001',
					'menuItemIcon':'',
					'parentId':null,
					'menuBarId':'5353ee3c-b5ba-47c5-9402-8ba486119d4a',
					'menuItemDefault':true,
					'serviceId':'f8ad578f-3d07-42f3-87d0-1d0e93fdd0af',
					'menuItemOrder':0,
					'url':'http://yzb.yyssc.org/home_index.html#/default',
					'service':{
						'createTime':1531363982000,
						'modifiedTime':1530845625000,
						'ts':1531363982000,
						'creator':'530b1b30-c7da-45e8-913f-a47cb5c0ea64',
						'tenantId':'vspcvrrj',
						'serviceId':'f8ad578f-3d07-42f3-87d0-1d0e93fdd0af',
						'title':' 首页',
						'serviceCode':'mywork',
						'applicationId':'b32b0b8a-47f7-4c24-9413-aa72b80fadb0',
						'enable':true,
						'url':'http://yzb.yyssc.org/home_index.html#/default',
						'serviceIcon':'',
						'capable':false,
						'ykjId':0,
						'level':0,
						'teamMenbersUnuse':false,
						'crossTenant':false,
						'selected':false,
						'simpleApplicationStatus':false,
						'clientStatus':false,
						'webStatus':true,
						'phoneStatus':false,
						'everyone':false,
						'sysEveryone':false,
						'phoneOrder':0,
						'businessType':'mng',
						'hasWidget':false,
						'relationServices':[

						],
						'relationUsers':[

						]
					},
					'serviceCode':'mywork',
					'children':[

					]
				},
				{
					'createTime':1531363982000,
					'modifiedTime':1531363982000,
					'ts':1531363982000,
					'creator':'530b1b30-c7da-45e8-913f-a47cb5c0ea64',
					'modifier':'530b1b30-c7da-45e8-913f-a47cb5c0ea64',
					'tenantId':'vspcvrrj',
					'menuItemId':'ce2b91c1-ac82-478c-a28d-b520086140de',
					'menuItemName':'凭证',
					'menuItemCode':'yzbmenu002',
					'menuItemIcon':'',
					'parentId':null,
					'menuBarId':'5353ee3c-b5ba-47c5-9402-8ba486119d4a',
					'menuItemDefault':true,
					'serviceId':'68140c71-2bde-4c67-a97b-72506578ea69',
					'menuItemOrder':0,
					'url':null,
					'service':{
						'createTime':1531363982000,
						'modifiedTime':1530847644000,
						'ts':1531363982000,
						'creator':'530b1b30-c7da-45e8-913f-a47cb5c0ea64',
						'tenantId':'vspcvrrj',
						'serviceId':'68140c71-2bde-4c67-a97b-72506578ea69',
						'title':'凭证',
						'serviceCode':'CWYFWYBZ00002',
						'applicationId':'b32b0b8a-47f7-4c24-9413-aa72b80fadb0',
						'enable':true,
						'url':'',
						'serviceIcon':'',
						'capable':false,
						'ykjId':1,
						'level':0,
						'teamMenbersUnuse':false,
						'crossTenant':false,
						'selected':false,
						'simpleApplicationStatus':false,
						'clientStatus':false,
						'webStatus':true,
						'phoneStatus':false,
						'everyone':false,
						'sysEveryone':false,
						'phoneOrder':0,
						'businessType':'mng',
						'hasWidget':false,
						'relationServices':[

						],
						'relationUsers':[

						]
					},
					'serviceCode':'CWYFWYBZ00002',
					'children':[
						{
							'createTime':1531363982000,
							'modifiedTime':1531363982000,
							'ts':1531363982000,
							'creator':'530b1b30-c7da-45e8-913f-a47cb5c0ea64',
							'modifier':'530b1b30-c7da-45e8-913f-a47cb5c0ea64',
							'tenantId':'vspcvrrj',
							'menuItemId':'891de39b-0824-44ca-8986-1aac8e3b91e9',
							'menuItemName':'凭证查询',
							'menuItemCode':'PZCX0001',
							'menuItemIcon':'',
							'parentId':'ce2b91c1-ac82-478c-a28d-b520086140de',
							'menuBarId':'5353ee3c-b5ba-47c5-9402-8ba486119d4a',
							'menuItemDefault':false,
							'serviceId':'f8ad578f-3d07-42f3-87d0-1d0e93fdd0af',
							'menuItemOrder':1,
							'url':null,
							'service':{
								'createTime':1531363982000,
								'modifiedTime':1530845625000,
								'ts':1531363982000,
								'creator':'530b1b30-c7da-45e8-913f-a47cb5c0ea64',
								'tenantId':'vspcvrrj',
								'serviceId':'f8ad578f-3d07-42f3-87d0-1d0e93fdd0af',
								'title':' 凭证查询',
								'serviceCode':'queryvoucher',
								'applicationId':'b32b0b8a-47f7-4c24-9413-aa72b80fadb0',
								'enable':true,
								'url':'http://yzb.yyssc.org/home_index.html#/voucher/list',
								'serviceIcon':'',
								'capable':false,
								'ykjId':0,
								'level':0,
								'teamMenbersUnuse':false,
								'crossTenant':false,
								'selected':false,
								'simpleApplicationStatus':false,
								'clientStatus':false,
								'webStatus':true,
								'phoneStatus':false,
								'everyone':false,
								'sysEveryone':false,
								'phoneOrder':0,
								'businessType':'mng',
								'hasWidget':false,
								'relationServices':[

								],
								'relationUsers':[

								]
							},
							'serviceCode':'queryvoucher',
							'children':[

							]
						}
					]
				}
			],
			current: {
				menuItemId: '891de39b-0824-44ca-8986-1aac8e3b91e9',
				title: '凭证查询',
				//服务编码，唯一确定一个service
				serviceCode:'queryvoucher',
				serviceId:'f8ad578f-3d07-42f3-87d0-1d0e93fdd0af',
				//组件内部嵌套iframe的url，此url会带有参数，形如：http://xxx.xxx.xxx/xxx?serviceCode=serv_1，iframe内部即可使用此serviceCode参数来控制属性菜单的展示
				url: 'http://yzb.yyssc.org/home_index.html#/voucher/list',
		}
		};
	};
	updateCurrent (serviceCode) {
		const menuPath = findPath(this.state.menuItems, 'children', 'serviceCode', serviceCode);
		let current = menuPath.slice(-1)[0];
		if(current){
			current=Object.assign(current,current.service);
			current.title = current.title;
		this.setState({ current });
		}
	};
	render () {
		const { menuItems,current } = this.state;
		return (<div>
			<div className={'workbench-title'}>
				<h2>{current.title}</h2>
				<p>{'面包屑>'+current.title}</p>
			</div>
			<FinanceCloud menuItems={menuItems}  current={current} updateCurrent={this.updateCurrent}/>
			</div>);
	}
};
ReactDOM.render(
	<App />,
	document.getElementById('example')
);
