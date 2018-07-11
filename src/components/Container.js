import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { toJS } from 'mobx';
import _ from 'lodash';
import { Provider, observer } from 'mobx-react';
import { withCookies, Cookies } from 'react-cookie';
import Menu from './Menu';
import TabContent from './TabContent.js';
import TabHeader from './TabHeader.js';
import TabHeaderMore from './TabHeaderMore.js';
const propTypes = {
	cookies: instanceOf(Cookies).isRequired,
};
var timer = null;
@observer
class Container extends Component {
constructor(props) {
	super(props);
	this.handleResize = this.handleResize.bind(this);
	this.menuClick = this.menuClick.bind(this);
	this.active = this.active.bind(this);
	this.closeAll = this.closeAll.bind(this);
	this.removeItem = this.removeItem.bind(this);
	this.remove = this.remove.bind(this);
	this.refreshTabList = this.refreshTabList.bind(this);
	this.refreshMoreList = this.refreshMoreList.bind(this);
	this.refreshCurrent = this.refreshCurrent.bind(this);
	this.refreshMenu = this.refreshMenu.bind(this);
	this.accChange = this.accChange.bind(this);
	this.handleMouseOver = this.handleMouseOver.bind(this);

	this.state = {
		menuData:[ {
			'virtual' : false,
			'code' : 'mywork',
			'children' : [ ],
			'name' : '首页',
			'icon' : 'workbanch.png',
			'id' : 'c05ef4e75b5c475db3760f76bd7e61f0',
			'url' : 'default',
			'desc' : {
				'accbook' : true
			}
		}, {
			'virtual' : true,
			'code' : 'financial',
			'children' : [ {
				'virtual' : false,
				'code' : 'addvoucher',
				'name' : '新增凭证',
				'icon' : 'voucher.png',
				'id' : '15590409f0204bb3b2ba24824f74655b',
				'url' : 'voucher/edit',
				'desc' : {
					'accbook' : true
				}
			}, {
				'virtual' : false,
				'code' : 'queryvoucher',
				'name' : '凭证查询',
				'icon' : 'voucher.png',
				'id' : '142ffc04d4274f9c84cd66ffea011453',
				'url' : 'voucher/list',
				'desc' : {
					'accbook' : true
				}
			} ],
			'name' : '财务处理',
			'icon' : 'voucher.png',
			'id' : '23d154e824f64e18b0b27502c32a5cd3',
			'url' : '',
			'desc' : null
		}, {
			'virtual' : true,
			'code' : 'accbook',
			'children' : [ {
				'virtual' : false,
				'code' : 'general',
				'name' : '总账',
				'icon' : 'books.png',
				'id' : '6f91e9605d044f458aeaef8bd9861d52',
				'url' : 'account/general',
				'desc' : {
					'accbook' : true
				}
			}, {
				'virtual' : false,
				'code' : 'subsidiary',
				'name' : '明细账',
				'icon' : 'books.png',
				'id' : '9a4f65c61cc54051b92914fc42019232',
				'url' : 'account/subsidiary',
				'desc' : {
					'accbook' : true
				}
			}, {
				'virtual' : false,
				'code' : 'balance',
				'name' : '余额表',
				'icon' : 'books.png',
				'id' : '648a79c1ac0643b8a054b070feb1bc61',
				'url' : 'account/balance',
				'desc' : {
					'accbook' : true
				}
			}, {
				'virtual' : false,
				'code' : 'account_subsidiary',
				'name' : '辅助明细账',
				'icon' : 'books.png',
				'id' : '4b2c2552be194a5893f15bb3184fc2e3',
				'url' : 'subsidiary',
				'desc' : {
					'accbook' : true
				}
			}, {
				'virtual' : false,
				'code' : 'help-balance',
				'name' : '辅助余额表',
				'icon' : 'books.png',
				'id' : '69faeb7da59e4f4b80afdbb650745a34',
				'url' : 'help-balance',
				'desc' : {
					'accbook' : true
				}
			}, {
				'virtual' : false,
				'code' : 'cashflowdetail',
				'name' : '现金流量明细账',
				'icon' : 'reportform.png',
				'id' : '20981e57af5143a9a6938344b5a4935b',
				'url' : 'cashflowsubsidiary',
				'desc' : {
					'accbook' : true
				}
			}, {
				'virtual' : false,
				'code' : 'cashflowanalysis',
				'name' : '现金流量分析',
				'icon' : 'reportform.png',
				'id' : '58281acc4f384c33b9257dfb85849640',
				'url' : 'cash',
				'desc' : {
					'accbook' : true
				}
			}, {
				'virtual' : false,
				'code' : 'subsidiary-help',
				'name' : '全辅助明细账',
				'icon' : 'reportform.png',
				'id' : '454081cd24ae4c5387f518a494b62785',
				'url' : 'subsidiary-help',
				'desc' : {
					'accbook' : true
				}
			}, {
				'virtual' : false,
				'code' : 'help-balance-help',
				'name' : '全辅助余额表',
				'icon' : 'reportform.png',
				'id' : 'ebb7515e015245b4ab6fa77759a9b8e6',
				'url' : 'help-balance-help',
				'desc' : {
					'accbook' : true
				}
			}, {
				'virtual' : false,
				'code' : 'stock',
				'name' : '存货明细账',
				'icon' : 'grey iconfont icon-appicon',
				'id' : 'f35c7765c9ee4da28df1e9816e129622',
				'url' : 'stock',
				'desc' : null
			} ],
			'name' : '账簿',
			'icon' : 'books.png',
			'id' : '1e75ac1e997b47958295debc67effa8e',
			'url' : '',
			'desc' : null
		}, {
			'virtual' : true,
			'code' : 'report',
			'children' : [ {
				'virtual' : false,
				'code' : 'BalanceSheetAh',
				'name' : '???',
				'icon' : 'basic-setting.png',
				'id' : 'test00000001',
				'url' : 'http://10.3.14.238/fireport/client/#/view/BalanceSheetAh/yonyoufi/ysdzxt76/',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'CapitalFlowSheet',
				'name' : '?????',
				'icon' : 'basic-setting.png',
				'id' : 'test00000003',
				'url' : 'http://10.3.14.238/fireport/client/#/view/CapitalFlowSheet/yonyoufi/ysdzxt76/',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'LoanAccount',
				'name' : '????',
				'icon' : 'basic-setting.png',
				'id' : 'test00000002',
				'url' : 'http://10.3.14.238/fireport/client/#/view/LoanAccount/yonyoufi/ysdzxt76/',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'wbgroup00006_CashFlow_1',
				'name' : '现金流量表(查看)',
				'icon' : 'grey iconfont icon-appicon',
				'id' : '86a163b96a7d4dcab221584d3ccba754',
				'url' : 'http://10.3.14.238/fireport/client/#/view/CashFlow/yonyoufi/ku951ms0/',
				'desc' : {
					'accbook' : true
				}
			}, {
				'virtual' : false,
				'code' : 'zcfzbreport',
				'name' : '资产负债表(报表)',
				'icon' : 'basic-setting.png',
				'id' : 'fc418ea1e0024745af17b0557119b7c1',
				'url' : 'http://10.3.14.238/fireport/client/#/view/BalanceSheet/fireport/ysdzxt76/',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'lrbreport',
				'name' : '利润表(报表)',
				'icon' : 'basic-setting.png',
				'id' : 'fc9711ad6bb8468a9295763c6a52e4a5',
				'url' : 'http://10.3.14.238/fireport/client/#/view/ProfitStatement/yonyoufi/ysdzxt76/',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'wbgroup00006_CashFlow_2',
				'name' : '现金流量表(填报)',
				'icon' : ' iconfont icon-appicon ',
				'id' : 'c1d3a881f117458fadc79d998b3c8ee5',
				'url' : 'http://10.3.14.238/fireport/client/#/view/CashFlow/yonyoufi/ku951ms0/fill=true&',
				'desc' : {
					'accbook' : true
				}
			}, {
				'virtual' : false,
				'code' : 'rpttype',
				'name' : '统计指标类型',
				'icon' : 'grey iconfont icon-appicon',
				'id' : '11cf8d404dd64d759734193c8c431232',
				'url' : 'http://10.3.14.238/fireport/client/#/rpttype/yonyoufi',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'rptitem',
				'name' : '统计指标项目',
				'icon' : 'grey iconfont icon-appicon',
				'id' : 'af53d759259a43acaf43cd69aa30c11f',
				'url' : 'http://10.3.14.238/fireport/client/#/rptitem/yonyoufi',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'ARBalance',
				'name' : '应收余额表',
				'icon' : ' iconfont icon-appicon ',
				'id' : '0cb883460d5e4264ab3af3b4447b2834',
				'url' : 'variedbalance/receive',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'APBalance',
				'name' : '应付余额表',
				'icon' : ' iconfont icon-appicon ',
				'id' : 'c7fb4e75a9f5496cba2789fed8987276',
				'url' : 'variedbalance/payment',
				'desc' : null
			} ],
			'name' : '会计报表',
			'icon' : 'reportform.png',
			'id' : '12f97e2431a3449fa92d55dbe88178c1',
			'url' : '',
			'desc' : null
		}, {
			'virtual' : true,
			'code' : 'checkoutindex',
			'children' : [ {
				'virtual' : false,
				'code' : 'trial',
				'name' : '试算平衡',
				'icon' : 'reportform.png',
				'id' : '7faae912bd4b4181a3fa1f87cd742787',
				'url' : 'trial',
				'desc' : {
					'accbook' : true
				}
			}, {
				'virtual' : false,
				'code' : 'carryover',
				'name' : '期末结转',
				'icon' : 'reportform.png',
				'id' : '800aeb45428a41ad87a13c1ec68ad71b',
				'url' : 'carryover',
				'desc' : {
					'accbook' : true
				}
			}, {
				'virtual' : false,
				'code' : 'checkout',
				'name' : '结账',
				'icon' : 'reportform.png',
				'id' : '3939ee81252049a1a3cada3aab11faaf',
				'url' : 'checkout',
				'desc' : {
					'accbook' : true
				}
			} ],
			'name' : '结账',
			'icon' : 'reportform.png',
			'id' : '8f040d2aa191448aa7a86b62bc1ff65e',
			'url' : '',
			'desc' : null
		}, {
			'virtual' : true,
			'code' : 'basesetting',
			'children' : [ {
				'virtual' : false,
				'code' : 'setting/accountbooklist',
				'name' : '账簿设置',
				'icon' : 'reportform.png',
				'id' : '7d7c8e813fc4416094b2adf7e8135964',
				'url' : 'setting/accountbooklist',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'setting/subjectchart',
				'name' : '科目表',
				'icon' : 'reportform.png',
				'id' : 'aefaaa53936b44eeb88e809d99b6b47b',
				'url' : 'setting/subjectchart',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'setting/accsubject',
				'name' : '会计科目',
				'icon' : 'reportform.png',
				'id' : '5a8500c21186484eb86a154610aedb0a',
				'url' : 'setting/accsubject',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'setting/multidimension',
				'name' : '辅助核算项',
				'icon' : 'reportform.png',
				'id' : 'cef6151bf636426ab425843a41aeef40',
				'url' : 'setting/multidimension',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'balance1',
				'name' : '期初余额',
				'icon' : 'reportform.png',
				'id' : '493b7ca5bd854792a02c5e9f6eb36fe4',
				'url' : 'balance',
				'desc' : {
					'accbook' : true
				}
			}, {
				'virtual' : false,
				'code' : 'setting/print',
				'name' : '打印设置',
				'icon' : 'reportform.png',
				'id' : 'f405354057844f26af86c4f0409345c7',
				'url' : 'setting/print',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'task_settings',
				'name' : '任务调度配置',
				'icon' : 'reportform.png',
				'id' : '46ee13b72b824100a0da8c9845a9ce2b',
				'url' : 'http://10.3.14.238/iuap-saas-dispatch-service',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'docdefine',
				'name' : '档案定义',
				'icon' : 'reportform.png',
				'id' : '9583de1a1787469295f29d8bb5e9e254',
				'url' : 'https://uastest.yyuap.com/basedoc/login.jsp?tenantId=&sysId=&bdType=docDefine&userId=',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'cashflowtype',
				'name' : '现金流量类型',
				'icon' : 'reportform.png',
				'id' : 'fb2dd943c688486cbd7299845ea64782',
				'url' : 'cashflowtype',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'cashflowitem',
				'name' : '现金流量项目',
				'icon' : 'reportform.png',
				'id' : 'ebeea2783b4b4bf29ff59c82655392b0',
				'url' : 'cashflowitem',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'cashflowmould',
				'name' : '现金流量规则模板',
				'icon' : 'reportform.png',
				'id' : '485332947dba450695c0dba441d3dda9',
				'url' : 'setting/cashflowmould',
				'desc' : {
					'accbook' : true
				}
			}, {
				'virtual' : false,
				'code' : 'cashflowsplitmould',
				'name' : '现金流量拆分模板',
				'icon' : 'grey iconfont icon-appicon',
				'id' : '74219d254a104494b15cdd5a74449dc1',
				'url' : 'setting/cashflowsplitmould',
				'desc' : {
					'accbook' : true
				}
			}, {
				'virtual' : false,
				'code' : 'permission',
				'name' : '权限管理',
				'icon' : 'basic-setting.png',
				'id' : '552394780d6f4b9498afc25aee83a4cb',
				'url' : 'permission',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'journalaccount',
				'name' : '流水账导入',
				'icon' : 'grey iconfont icon-appicon',
				'id' : 'fde76260676640c19e31fc4bec938dae',
				'url' : 'journalaccount',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'costdomain',
				'name' : '成本域',
				'icon' : 'grey iconfont icon-appicon',
				'id' : 'e39a760d8eb74afe93bb9e3905d77e25',
				'url' : 'cost',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'consignment',
				'name' : '核算委托关系',
				'icon' : 'grey iconfont icon-appicon',
				'id' : '7efaf64d6e294e60a792e1dbad8b13b7',
				'url' : 'consignment',
				'desc' : null
			} ],
			'name' : '基础设置',
			'icon' : 'basic-setting.png',
			'id' : 'e0c90c35eb9047e18cafec36056ede01',
			'url' : '',
			'desc' : null
		}, {
			'virtual' : true,
			'code' : 'basedoc',
			'children' : [ {
				'virtual' : false,
				'code' : 'org',
				'name' : '组织',
				'icon' : 'basic-file.png',
				'id' : '165070240afa4299b7c4f1fea0f88a65',
				'url' : 'https://uastest.yyuap.com/org/login.jsp?tenantId=&sysId=&orgType=fin_dept_org&userId=',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'basedoc/supplier',
				'name' : '供应商',
				'icon' : 'basic-file.png',
				'id' : '0fd7823f8af145e3ba24a21798e768ca',
				'url' : 'basedoc/supplier',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'personnel',
				'name' : '人员',
				'icon' : 'grey iconfont icon-appicon',
				'id' : '8042359b02674aa5b5df9fe4c90ae589',
				'url' : 'https://uastest.yyuap.com/basedoc/login.jsp?tenantId=&sysId=&bdType=staff&userId=',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'basedoc/supplierclass',
				'name' : '供应商分类',
				'icon' : 'basic-file.png',
				'id' : '0f2422c6ccf64dc2a06aaad729d06658',
				'url' : 'basedoc/supplierclass',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'basedoc/customer',
				'name' : '客户',
				'icon' : 'basic-file.png',
				'id' : '60d029e5d95b4663805de73a5440760f',
				'url' : 'basedoc/customer',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'basedoc/customerclass',
				'name' : '客户分类',
				'icon' : 'basic-file.png',
				'id' : 'f80f48630e2743c6870fdb8824284a6a',
				'url' : 'basedoc/customerclass',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'basedoc/projectclass',
				'name' : '项目分类',
				'icon' : 'basic-file.png',
				'id' : 'ddea219c8f5a4ea18307a7f7c028899a',
				'url' : 'basedoc/projectclass',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'basedoc/project',
				'name' : '项目',
				'icon' : 'basic-file.png',
				'id' : '165c7a65012545588e42f71059395e11',
				'url' : 'basedoc/project',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'docmaintenance',
				'name' : '档案维护',
				'icon' : 'basic-file.png',
				'id' : 'f4d6f4a220c74ad285f8e3ad8203b4b6',
				'url' : 'https://uastest.yyuap.com/basedoc/login.jsp?tenantId=&sysId=&bdType=docInfo&userId=',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'remark',
				'name' : '摘要',
				'icon' : 'basic-file.png',
				'id' : '423ce27efd484e4fa7e247a654c81caf',
				'url' : 'setting/remark',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'feeitemclass',
				'name' : '费用项目类型',
				'icon' : 'basic-file.png',
				'id' : '9f449520d21447c58a6a344dd21a3ff1',
				'url' : 'basedoc/feeitemclass',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'feeitem',
				'name' : '费用项目',
				'icon' : 'basic-file.png',
				'id' : '9b20194a20524915a0ba4efe8fdf43b3',
				'url' : 'basedoc/feeitem',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'assetsclass',
				'name' : '资产分类',
				'icon' : 'basic-file.png',
				'id' : '88208627fe5c4d818cba00516b0e44dc',
				'url' : 'basedoc/assetsclass',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'exchangerate',
				'name' : '汇率方案',
				'icon' : 'basic-file.png',
				'id' : 'd7e99e967c3e4a848efde472e4d08945',
				'url' : 'setting/exchangerate',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'currency',
				'name' : '币种',
				'icon' : 'grey iconfont icon-appicon',
				'id' : 'cec81ffb08fa4e22bb43fb5df1e826e7',
				'url' : 'http://uastest.yyuap.com/basedoc/login.jsp?tenantId=&sysId=&bdType=currency&userId=',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'customerbankacc',
				'name' : '客户银行账户',
				'icon' : 'reportform.png',
				'id' : 'feaf8adfab6f463f97b6981be09f43e4',
				'url' : 'basedoctree/customer',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'finorgbankacct',
				'name' : '组织银行账户',
				'icon' : 'reportform.png',
				'id' : '7421f43aff454fc0bce274a454b14da5',
				'url' : 'basedoctree/org',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'supplierbankacct',
				'name' : '供应商银行账户',
				'icon' : 'reportform.png',
				'id' : '40e000efe6154c0eb057ea2f01b9dc81',
				'url' : 'basedoctree/supplier',
				'desc' : null
			} ],
			'name' : '基础档案',
			'icon' : 'basic-file.png',
			'id' : '5576cf6a5990494b88d5aae1b8e6f12a',
			'url' : '',
			'desc' : null
		}, {
			'virtual' : true,
			'code' : 'platform',
			'children' : [ {
				'virtual' : false,
				'code' : 'setting/contrastnew',
				'name' : '档案转换',
				'icon' : 'financial-platform.png',
				'id' : '983a6a9cbb8b4fd3aa4ae0880c72b62b',
				'url' : 'setting/contrastnew',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'conversion',
				'name' : '转换模板',
				'icon' : 'financial-platform.png',
				'id' : '60f2238c3a194d8e95e5d5035efc486d',
				'url' : 'conversion',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'tovoucher',
				'name' : '重新生成凭证',
				'icon' : ' iconfont icon-appicon ',
				'id' : '83538cfb1d8b47a5bf81979d7dec577d',
				'url' : 'tovoucher',
				'desc' : null
			} ],
			'name' : '智能会计平台',
			'icon' : 'financial-platform.png',
			'id' : '1a375821382b4f47a82a144bfe849e4a',
			'url' : '',
			'desc' : null
		}, {
			'virtual' : true,
			'code' : 'bizbill',
			'children' : [ {
				'virtual' : false,
				'code' : 'freeebill',
				'name' : '自由表单',
				'icon' : 'grey iconfont icon-appicon',
				'id' : '074fb6f0c6d541cda8bb9b18682cfaa6',
				'url' : 'keep',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'rgfpbody',
				'name' : '发票明细',
				'icon' : ' iconfont icon-appicon ',
				'id' : 'ea62722efe854b9d8fbaf0a3c5300cfe',
				'url' : 'keep/rgfpbody',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'rgyhdzd',
				'name' : '银行对帐单',
				'icon' : 'grey iconfont icon-appicon',
				'id' : '0cc3cea4e17d402c8b016086ddf9fb7a',
				'url' : 'keep/rgyhdzd',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'testbill',
				'name' : '主子表测试',
				'icon' : 'grey iconfont icon-appicon',
				'id' : 'e456bf59e0c14d41bd9cb9ab101c5769',
				'url' : 'keep/rgfp',
				'desc' : null
			} ],
			'name' : '业务单据',
			'icon' : 'iconfont icon-nav-bizbill',
			'id' : 'be6f18709ef144a79e193c50d5505b02',
			'url' : '',
			'desc' : null
		}, {
			'virtual' : true,
			'code' : 'assets',
			'children' : [ {
				'virtual' : false,
				'code' : 'fixedasset',
				'name' : '固定资产维护',
				'icon' : 'fixedasset.png',
				'id' : '10f83f5717cf4cfe9838ec496d5ad0c4',
				'url' : 'assets',
				'desc' : null
			} ],
			'name' : '固定资产',
			'icon' : 'fixedasset.png',
			'id' : '13bbddf530a3488299af0ad90a17634a',
			'url' : '',
			'desc' : null
		}, {
			'virtual' : true,
			'code' : 'itemlib',
			'children' : [ {
				'virtual' : false,
				'code' : 'account_template',
				'name' : '事项模板',
				'icon' : ' iconfont icon-appicon ',
				'id' : '37e3ae18082840be920301cf66b083e0',
				'url' : 'itemlib/voucher',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'inner',
				'name' : '内部交易',
				'icon' : ' iconfont icon-appicon ',
				'id' : '651611bfe53647cdbff2e7c14eee67e1',
				'url' : 'eventacc/trans',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'purchasein',
				'name' : '采购入库单',
				'icon' : 'grey iconfont icon-appicon',
				'id' : '177d79f3b2c54161af228a90ff084f6e',
				'url' : 'inventory/purch',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'entitymapping',
				'name' : '实体转换',
				'icon' : 'grey iconfont icon-appicon',
				'id' : '436837aa50f44d738856c8334fbfd7e8',
				'url' : 'entitymapping',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'transin',
				'name' : '调拨入库单',
				'icon' : ' iconfont icon-appicon ',
				'id' : 'f5b883b55a8a4aa39172b52b59bd683b',
				'url' : 'inventory/transin',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'ap',
				'name' : '应付单',
				'icon' : ' iconfont icon-appicon ',
				'id' : '90210c1f178b454caed1e3c8e5ff27a4',
				'url' : 'ap',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'paybill',
				'name' : '付款单',
				'icon' : ' iconfont icon-appicon ',
				'id' : 'eed6e2aec1f248a2b98fb0664de1a003',
				'url' : 'apy',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'ar',
				'name' : '应收单',
				'icon' : ' iconfont icon-appicon ',
				'id' : 'eed6e2aec1f248a2b98fb0664de1a004',
				'url' : 'ar',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'aps',
				'name' : '收款单',
				'icon' : ' iconfont icon-appicon ',
				'id' : 'eed6e2aec1f248a2b98fb0664de1a005',
				'url' : 'aps',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'distsetting',
				'name' : '分发设置',
				'icon' : 'grey iconfont icon-appicon',
				'id' : 'b8b4172669b44c08a9422a2881445d94',
				'url' : 'distsetting',
				'desc' : null
			}, {
				'virtual' : false,
				'code' : 'distlog',
				'name' : '分发日志',
				'icon' : 'grey iconfont icon-appicon',
				'id' : '1c08efba14c64b5cb018e7b41c447844',
				'url' : 'distlog',
				'desc' : null
			} ],
			'name' : '事项会计',
			'icon' : 'grey iconfont icon-appicon',
			'id' : 'bf78f718d386485dab3883da20a8a228',
			'url' : '',
			'desc' : null
		}, {
			'virtual' : true,
			'code' : 'dataimport',
			'children' : [ {
				'virtual' : false,
				'code' : 'basedocimport',
				'name' : '基本档案导入',
				'icon' : ' iconfont icon-appicon ',
				'id' : 'd5c95c5e7f794133863a984a4f3b509b',
				'url' : 'importbasedoc',
				'desc' : null
			} ],
			'name' : '数据导入',
			'icon' : ' iconfont icon-appicon ',
			'id' : 'bbbfa2f28905491b9e829fd0b940a097',
			'url' : '',
			'desc' : null
		} ],
		// 首页
		homePage: 'mywork',
		// 最大显示页签数
		maxLength: 10,
		// 默认首页数据
		defaultData: [{
			id: 'mywork',
			code: 'mywork',
			name: '首页',
			basePath: 'home_index.html?',
			desc: {
				accbook: true
			}
		}],

		// 页签列表数据
		tabList: [],
		// 当前页签
		currentCode: 'mywork',
		// 更多页签数据
		moreList: [],
		// 是否显示更多页签
		moreIsShow: false,
		width: ''
	};
	// this.tabsStore = new TabsStore();
}

componentDidMount() {
	let that = this;
	// this.tabsStore.getPerms();
	// if (GlobalTabsStore.getAccBook != 'undefined') {
		let defMenu = Object.assign([], that.state.defaultData);
	// 	defMenu[0].accBook = GlobalTabsStore.getAccBook;
		this.setState(
			{
				tabList: [...defMenu],
			});
	// }

	let windowWidth = $(window).width();
	let width = windowWidth - 350;
	that.setState({ width });

	// 监听窗口大小改变事件
	window.addEventListener('resize', this.handleResize);
}

componentWillUnmount() {
	window.removeEventListener('resize', this.handleResize);
}

handleResize (e) {
	let that = this;
	if (typeof timer === 'number') {
		clearTimeout(timer);
	}
	timer = setTimeout(()=>{
		let windowWidth = $(window).width();
		let width = windowWidth - 350;
		that.setState({ width });
	},200);
}

/**
 * 单击菜单时,打开功能页,需处理地址参数
 * @param  {Object} item 比如
 * ```js
 * {
         virtual: false,
         code: 'addvoucher',
         name: '新增凭证',
         icon: ' iconfont icon-appicon ',
         id: '15590409f0204bb3b2ba24824f74655b',
         url: 'voucher/edit',
         basePath: 'home_index.html?version=64fadc5b8cd26e3b05b5',
         params: {
             defaultAcc: ''
         }
     }
 * ```
 * @return {[type]}      [description]
 */
menuClick (item) {
	let that = this;
	//是否使用账簿
	// if (item.desc !== null && item.desc !== undefined && item.desc.accbook == true) {
	// 	GlobalTabsStore.isAccBook = true;
	// } else{
	// 	GlobalTabsStore.isAccBook = false;
	// }

	let newTab = toJS(item);

	//处理需要主动切换账簿问题
	if (newTab.params) {
		//把当前账簿切换
		if (newTab.params.accbook && newTab.params.accbook != '') {
			GlobalTabsStore.accBook = newTab.params.accbook;
			this.refs.acc.setValue(newTab.params.accbook);
		}
	}
    //
	// // 设为当前的账簿
	// newTab.accBook = GlobalTabsStore.getAccBook;

	// 存在code就置为当前页面,不存在就增加
	let exist = _.find(that.state.tabList, menu => menu.code == newTab.code);
	let moreExist = _.find(that.state.moreList, menu => menu.code == newTab.code);

	// 判断是否修改了URL而需要重新载入页面, 首页不处理
	if (newTab.code != 'mywork') {
		if (exist) {
			that.refreshMenu(item);
		}

		if (moreExist) {
			that.refreshMenu(item);
		}
	}

	exist = exist || moreExist;
	// console.log(exist);
	if (exist) {
		that.setState({ currentCode: newTab.code });
	} else if (that.state.tabList.length >= that.state.maxLength) {
		that.setState({ moreIsShow: true, moreList: [...that.state.moreList, newTab], currentCode: newTab.code });
	} else {
		that.setState({ tabList: [...that.state.tabList, newTab], currentCode: newTab.code });
	}

	// 记录点击历史
	// this.tabsStore.recordmenu(item.code);
}

active  (code) {
	if (code == 'closeAll') {
		this.closeAll();
		return;
	}
	this.setState({ currentCode: code }, ()=> {
		// 设置当前账簿为当前页签的账簿.
		let newTab = _.find(this.state.tabList, menu => menu.code == this.state.currentCode);
		if (!newTab) {
			newTab = _.find(this.state.moreList, menu => menu.code == this.state.currentCode);
		}
		this.refs.acc.setValue(newTab.accBook);

		//设置账簿状态
		//if (newTab.name == '总账') newTab.desc.accbook = false;
		if (newTab.desc !== null && newTab.desc !== undefined && newTab.desc.accbook == true) {
			GlobalTabsStore.isAccBook = true;
		} else{
			GlobalTabsStore.isAccBook = false;
		}
	});
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

removeItem (code) {
	let that = this;
	// let list = [for (item of this.state.tabList) item != name];
	let index = _.findIndex(this.state.tabList, item => item.code == code);

	// let index = this.state.tabList.indexOf(item => );

	let list = _.reject(this.state.tabList, { code });
	if (list.length <= index) {
		index = list.length - 1;
		index < 0 ? index = 0 : null;
	}
	console.log(JSON.stringify(list));
	this.setState({ tabList: list }, () => {
		if (this.state.tabList.length >= index && this.state.currentCode == code) {
			that.active(this.state.tabList[index].code);
			//this.setState({ currentCode: this.state.tabList[index].code });
		}
	});
}

remove (code) {
	// 首页不能删除
	if (code == this.state.homePage) return;

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

//刷新TabList
refreshTabList (tab, code) {
	let newTab = Object.assign({}, tab);
	newTab.accBook = GlobalTabsStore.getAccBook;

	let j = _.findIndex(this.state.tabList, item => item.code == code);
	let jl = this.state.tabList.length;
	let tl = [];
	if (j == 0) {
		tl = [newTab, ...this.state.tabList.slice(1, jl)];
	} else if (j == jl) {
		tl = [...this.state.tabList.slice(0, j - 1), newTab];
	} else {
		tl = [...this.state.tabList.slice(0, j), newTab, ...this.state.tabList.slice(j + 1, jl)];
	}
	this.setState({ tabList: tl, currentCode: newTab.code }, () => {
	});
}

//刷新MoreList
refreshMoreList (tab, code) {
	let newTab = Object.assign({}, tab);
	newTab.accBook = GlobalTabsStore.getAccBook;

	let i = _.findIndex(this.state.moreList, item => item.code == code);
	let il = this.state.moreList.length;
	let ml = [];
	if (i == 0) {
		ml = [newTab, ...this.state.moreList.slice(1, il)];
	} else if (i == il) {
		ml = [...this.state.moreList.slice(0, i - 1), newTab];
	} else {
		ml = [...this.state.moreList.slice(0, i), newTab, ...this.state.moreList.slice(i + 1, il)];
	}

	this.setState({ moreIsShow: true, moreList: ml, currentCode: newTab.code }, () => {
	});
}

// 账簿改变,刷新当前页, 有Item说明当前页数据改变, 没有只刷新账簿
refreshCurrent () {
	let tab = _.find(this.state.tabList, menu => menu.code == this.state.currentCode);
	if (tab) {
		if (this.state.currentCode === 'addvoucher'){
			tab.routerParams = '';
		}
		this.refreshTabList(tab, this.state.currentCode);
	} else {
		tab = _.find(this.state.moreList, menu => menu.code == this.state.currentCode);
		this.refreshMoreList(tab, this.state.currentCode);
	}
}

// 账簿改变,刷新当前页, 有Item说明当前页数据改变, 没有只刷新账簿
refreshMenu (item) {
	// item.accBook = GlobalTabsStore.getAccBook;
	let tab = _.find(this.state.tabList, menu => menu.code == item.code);
	if (tab) {
		this.refreshTabList(item, item.code);
	} else {
		tab = _.find(this.state.moreList, menu => menu.code == item.code);
		if (tab) {
			this.refreshMoreList(item, item.code);
		}
	}
}

accChange (value) {
	// 改变账簿时候,把全局账簿变量修改(重构:重命名为当前账簿)
	GlobalTabsStore.accBook = value;
	// console.log(`accbook:${value}`);
	setTimeout(this.refreshCurrent, 100);
	// 刷新当前的Tab页
}
handleMouseOver (e) {
	e.stopPropagation();
	e.preventDefault();
	this.refs.menu.handleMouseOut();
}

render() {
	const { tabList, moreList } = this.state;

	let moreTab =
		(<TabHeaderMore
			onActive={this.active}
			currentCode={this.state.currentCode}
			moreList={this.state.moreList}
			isShow={this.state.moreIsShow}
		/>);

	let tab = (
		<div className="main-tab" style={{ width: this.state.width }}>
			{tabList.map(item => (<TabHeader
				key={`tab_${item.code}`}
				item={item}
				onActive={this.active}
				active={this.state.currentCode == item.code}
				onRemove={this.remove}
			/>))}
			{moreTab}
		</div>

	);

	let tabContent = (
		<div className="iframe-container" onMouseOver={this.handleMouseOver}>
			<div className="clear">
				{tabList.map(item => (<TabContent
					key={`tabContent_${item.code}`}
					item={item}
					onActive={this.active}
					active={this.state.currentCode == item.code}
					onRemove={this.remove}
				/>))}
				{moreList.map(item => (<TabContent
					key={`tabContent_${item.code}`}
					item={item}
					onActive={this.active}
					active={this.state.currentCode == item.code}
					onRemove={this.remove}
				/>))}
			</div>
		</div>
	);


	return (
		<div>
			{
				//<TabAccBook ref='acc' onChange={this.accChange} />
			}
			<Menu menuData={this.state.menuData} onMenuClick={this.menuClick} ref="menu" />
			{tab}
			{tabContent}
		</div>
	);
}
}

Container.propTypes = propTypes;

export default withCookies(Container);
