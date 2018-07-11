// 常量

function GetQueryString(name) {
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

// 版本号,每次正式发版,需要手动增加此版本号,要不IFrame里会产生页面缓存
let dotest = GetQueryString('dotest');
dotest = dotest == null ? '' : `&dotest=${dotest}`;
const DEV_SERVER = 'http://127.0.0.1:3009/ficloud';

const FRAME_PAGE = 'home_index.html';

// 调用java api的url
let protocol = 'http';
if (process.env.PROD_SERVER === 'acc.yonyoucloud.com' || process.env.PROD_SERVER === 'fi.yonyoucloud.com') {
    protocol = 'https';
}
let serverHost = `${protocol}://${process.env.PROD_SERVER}/`;
let serverUrl = `${protocol}://${process.env.PROD_SERVER}/ficloud`;
let serverAccess = `${protocol}://${process.env.PROD_SERVER}/fiaccess`;
let serverOtp = `${protocol}://${process.env.PROD_SERVER}/otp`;     // 只有公式编辑器时使用
let httpHostUrl = `http://${process.env.PROD_SERVER}/ficloud`;

if (process.env.NODE_ENV === 'development') { // 开发调试
    serverUrl = DEV_SERVER;
    serverUrl = 'http://172.20.4.220/ficloud';
    // serverUrl = "http://127.0.0.1:88/yzb";
    serverAccess = 'http://172.20.4.220/fiaccess';
    serverOtp = 'http://172.20.4.220/otp';
    serverHost = 'http://172.20.4.220:80/';
    httpHostUrl = serverUrl;
}

if (process.env.PROD_SERVER === '172.20.4.220') {
    serverUrl = 'http://172.20.4.220/ficloud';
    serverAccess = 'http://172.20.4.220/fiaccess';
    serverOtp = 'http://172.20.4.220/otp';
    serverHost = 'http://172.20.4.220/';
    httpHostUrl = serverUrl;
}
// portal的url
let localUrl = `http://${window.location.host}`;
var loginIndexUrl = `https://euc.yonyoucloud.com/cas/login?sysid=yonyoufi&service=${httpHostUrl}/login/index`;
if (process.env.PROD_SERVER !== 'acc.yonyoucloud.com') {
    loginIndexUrl = `http://idtest.yyuap.com/cas/login?sysid=yonyoufi&service=${httpHostUrl}/login/index`;
}

// serverUrl = 'http://10.3.14.240:8868';   //系统级  事项

// 友账表

let Config = {
    FRAME_PAGE,
    serverUrl,
    localUrl,
    serverHost,
    loginRedirect:loginIndexUrl,
    // 首页
    commontemplate: `${serverUrl}/customviewctrl/query`,   // 账表通用列表模型获取
    defaultpage: {
        menu: `${serverHost}workbench/wb/empoweredApps/getApps`,
        recordmenu: `${serverUrl}/user/recordmenu`,
        hismenu: `${serverUrl}/user/hismenu`,
        query: `${serverHost}workbench/wb/empoweredApps/getReportApps`,
        view: `${serverHost}fireport/rptview/view`
    },
    // 期末结转
    carryover: {
        query: `${serverUrl}/vt/desklist`,
        deskmakevt: `${serverUrl}/vt/deskmakevt`,    // 重新生成凭证接口
        vtterminal: `${serverUrl}/vt/vtterminal`,//获取凭证模版的状态
        queryHasVoucher:`${serverUrl}/vt/queryvoucher `,//查询是否已经生成凭证
        orderbillcode:`${serverUrl}/vt/orderbillcode `,//整理凭证号
    },
    assetbiz: {
        cleandepre: `${serverUrl}/assetbiz/cleandepre`,
        getdepretaskinfo: `${serverHost}asset/assetbiz/getdepretaskinfo`
    },
    accbook: {
        getRefAll: `${serverUrl}/accbook/refallbooks`,
        getAll: `${serverUrl}/accbook/allbooks`,
        getDefault: `${serverUrl}/user/defaultaccbook`,
        accbook: `${serverUrl}/accbook/`,
        enable: `${serverUrl}/accbook/enable`,
        defaultData: `${serverUrl}/accbook/defaultData`,
        cashflowtype: `${serverUrl}/accbook/cashflowtype`,     // 从账簿中获取现金流量类型
        getConfig: `${serverUrl}/ficommon/info`,//获取友账表统一配置信息
        queryAccBody: `${serverUrl}/accbook/queryaccbody`, //获取会计主体(财务组织)
        queryByAccBook: `${serverUrl}/accbook/querybyaccbook`, //根据账簿id查询会计主体
        saveAccBody: `${serverUrl}/accbook/saveaccbody`, //保存会计主体
        deleteAccBody: `${serverUrl}/accbook/deleteaccbody`, //删除会计主体
    },
    setting: {
        contrastQuery: `${serverUrl}/classmapping/query`,           // 对照表 查询接口
        contrastDelete: `${serverUrl}/classmapping/delete`,         // 对照表 删除接口
        contrastpDelete: `${serverUrl}/classmapping/batchdel`,      // 对照表 批量删除接口
        contrastUpdate: `${serverUrl}/classmapping/update`,         // 对照表 修改接口
        contrastAdd: `${serverUrl}/classmapping/add`,               // 对照表 增加接口
        contrastFormTable: `${serverUrl}/ficloud_pub/initgrid`,     //
        contrastBodyColumn: `${serverUrl}/classmapping/initgrid`,   // 子表列的规定
        contrastInitgridvo: `${serverUrl}/classmapping/initgridvo`, // 根据选项获取子列表
        exchangerate: `${serverUrl}/currency/queryratescheme`,      // 汇率档案列表信息查询
        exchangeratebydate: `${serverUrl}/currency/queryratebydate`,// 汇率档案录入信息查询
        exchangeratesave: `${serverUrl}/currency/ratesave`          // 汇率档案录入信息保存
    },
    account: {
        docType: `${serverUrl}/multidimension_ext/vrNameDocTypeCode`,   // 查询所有的辅助核算项
        voucher: `${serverUrl}/remark/analy`,                       // 凭证创新应用，根据摘要匹配模板
        queryModCtrl: `${serverUrl}/customqueryctrl/query`,         // 查询模板动态查询条件
        voucherList: `${serverUrl}/voucher/queryconditiondetail`,   // 查询凭证列表
        voucherListTmp: `${serverUrl}/vouchertmp/queryconditiondetail`, // 查询凭证列表
        voucherAudit: `${serverUrl}/voucher/audit`,                 // 凭证审核
        voucherCancelAudit: `${serverUrl}/voucher/cancelaudit`,     // 凭证取消审核
        voucherTally: `${serverUrl}/voucher/tally`,                 // 凭证记账
        voucherCancelTally: `${serverUrl}/voucher/canceltally`,     // 凭证取消记账
        voucherSign: `${serverUrl}/voucher/sign`,                   // 凭证签字
        voucherDetail: `${serverUrl}/voucher/query`,                // 查询凭证详情
        voucherTpl: `${serverUrl}/vt/vview`,                        // 匹配到的凭证模板
        voucherDel: `${serverUrl}/voucher/del`,                     // 删除
        voucherTmpDel: `${serverUrl}/vouchertmp/del`,               // 临时凭证删除
        upload: `${serverUrl}/voucher/upload`,                      // 上传
        filelist: `${serverUrl}/voucher/filelist`,                  // 附件列表
        filedel: `${serverUrl}/voucher/attach/delete`,              // 附件删除
        getPrintData: `${serverUrl}/print/getdata`,                 // 获取打印数据
        print: `${serverUrl}/print/preview`,                        // 打印
        templateSave: `${serverUrl}/voucherTemplate/save`,          // 凭证模板保存
        templateQuery: `${serverUrl}/voucherTemplate/query`,        // 凭证模板查询
        schemaSave: `${serverUrl}/query/scheme/add`,                // 查询方案保存
        schemaQuery: `${serverUrl}/query/scheme/list`,              // 查询方案查询
        schemaDelete: `${serverUrl}/query/scheme/delete`,           // 查询方案删除
        voucherEnable: `${serverUrl}/voucher/enable`,
        voucherDisable: `${serverUrl}/voucher/disable`,
        voucherSave: `${serverUrl}/voucher/save`,
        //voucherSave: `${serverUrl}/vouchertmp/save`,//http://127.0.0.1:80/ficloud/vouchertmp/save
        voucherTmpSave: `${serverUrl}/vouchertmp/save`,             // 临时凭证保存
        voucherTmpOutSave: `${serverUrl}/vouchertmp/outsave`,       // 临时外系统推临时凭证
        tmpCreateVoucher: `${serverUrl}/vouchertmp/genvoucher`,     // 临时凭证生成正式凭证
        treeNodeUrl: `${serverUrl}/aquiresubject/query`,
        settleCheck: `${serverUrl}/account/settlecheck`,        // 结账检查
        settle: `${serverUrl}/account/settle`,
        getSettleCheckItems: `${serverUrl}/account/getsettlecheckitems`,    // 获取结账的检查项
        getAccBookPeriod: `${serverUrl}/account/getaccbookperiod`,
        unsettle: `${serverUrl}/account/unsettle`,
        isSettle: `${serverUrl}/account/issettle`,
        exportEXL: `${serverUrl}/voucherExpt/export`,     // 导出EXL
        exportXML: `${serverUrl}/voucher/exportxml`       // 导出XML
    },
    tempvoucher: {
        query: `${serverUrl}/vouchertmp/query`,
        save: `${serverUrl}/vouchertmp/genonevoucher`
    },
    balance: {
        query: `${serverUrl}/balance/query`,            // 期初余额 查询接口
        save: `${serverUrl}/balance/save`,              // 期初余额 删除接口
        trial: `${serverUrl}/balance/trial`,            // 期初余额 平衡接口
        help: `${serverUrl}/balance/auxiliaryQuery`,    // 查询辅助期初余额
        helpSave: `${serverUrl}/balance/auxiliarySave`, // 保存辅助期初余额
        import: `${serverUrl}/balance/import`,
        download: `${serverUrl}/balance/download`,
        export: `${serverUrl}/balance/export`
    },
    report: {
        generalledger: `${serverUrl}/generalledger/query`,              // 总账
        subjectlevel: `${serverUrl}/accsubjectchart/getsubjectlevel`,   // 科目级次
        detailaccount: `${serverUrl}/detailaccount/query`,              // 明细账
        subjecttree: `${serverUrl}/aquiresubject/query`,                // 科目树
        accsubjectbalance: `${serverUrl}/accsubjectbalance/query`       // 科目余额表
    },
    generalledgerexpt: `${serverUrl}/generalLedgerExpt/export`,                   // 总账 导出
    detailaccountexpt: `${serverUrl}/detailaccountExpt/export`,                   // 科目明细账 导出
    accsubjectbalanceexpt: `${serverUrl}/accsubjectbalanceExpt/export`,           // 科目余额表 导出
    auxiliarydetailaccountexpt: `${serverUrl}/auxiliarydetailaccountExpt/export`, // 辅助明细账 导出
    auxiliarybalanceexpt: `${serverUrl}/auxiliarybalanceExpt/export`,             // 辅助余额表 导出
    voucher: {
        // voucherRefer:serverUrl+'/accsubjectchart/query',     // 基础档案接查询接口  ////query
        voucherRefer: `${serverUrl}/accsubject/query`,
        voucherRefer2: `${serverUrl}/accsubject/queryvrbyaccbook`,// 辅助核算项
        // voucherRefer2:serverUrl+'/accsubject/queryvrbysubject',
        getrate: `${serverUrl}/currency/getrate`,//获取汇率
        anlsCashFlow: `${serverUrl}/cashflow/anls`,              // 现金流量自动分析
        queryCashFlow: `${serverUrl}/cashflow/query`,            // 查询现金流量分析
        saveCashFlow: `${serverUrl}/cashflow/save`               // 保存现金流量分析
    },
    aquirecfitem: `${serverUrl}/aquirecfitem/query`,            // 现金流量项目树 查询
    cashflowdetail: `${serverUrl}/cashflowdetail/query`,        // 现金流量列表项 查询
    cashflowpub: {
        getItems: `${serverUrl}/cashflowpub/getItems`,          // 现金流量表表项查询
        getRel: `${serverUrl}/cashflowpub/getRel`,              // 获取项目科目关系
        editRel: `${serverUrl}/cashflowpub/editRel`,            // 新增或编辑项目科目关系
        getAllTypes: `${serverUrl}/cashflowpub/getAllTypes`,     // 查询现金流量类型
        editType: `${serverUrl}/cashflowpub/editType`,           // 新增或修改现金流量类型
        delType: `${serverUrl}/cashflowpub/delType`,             // 删除现金流量类型
        copyType: `${serverUrl}/cashflowpub/copyType`,           // 复制现金流量类型
        extendsType: `${serverUrl}/cashflowpub/extends`,         // 管控派生现金流量类型
        getAllItems: `${serverUrl}/cashflowpub/getAllItems`,     // 查询现金流量项目
        editItem: `${serverUrl}/cashflowpub/editItem`,           // 新增或编辑现金流量项目
        delItem: `${serverUrl}/cashflowpub/delItem`,          // 删除现金流量项目
        multidimension: `${serverUrl}/multidimension_ext`,       // 辅助核算部门
        queryRules: `${serverUrl}/cashflowpub/queryRules`,       // 查询模板列表
        queryRulesOfSys: `${serverUrl}/cashflowpub/queryRulesOfSys`, // 查询系统模板列表
        editRule: `${serverUrl}/cashflowpub/editRule`,           // 保存&&编辑模板
        getRule: `${serverUrl}/cashflowpub/getRule`,           // 保存&&编辑模板
        delRule: `${serverUrl}/cashflowpub/deleteRule`,           // 删除模板
    },
    cashanalysis: {
        muldelVoucher: `${serverUrl}/cashflow/multdel`,          // 现金流量分析批量删除
        analyVoucher: `${serverUrl}/cashflow/multanls`,        // 现金流量批量分析
        voucherList: `${serverUrl}/cashflow/queryconditiondetail`,   // 查询凭证列表
    },
    workechart: {
        voucherNumber: `${serverUrl}/echart/voucherNumber`,
        financialIndex: `${serverUrl}/echart/financialIndex`,
        financialAny: `${serverUrl}/echart/financialAny`,
        state: `${serverUrl}/echart/state`,
        accpropertyList: `${serverUrl}/echart/accpropertyList`,
        orgInfo: `${serverUrl}/org/getcurrentorg`,
        metatree: `${serverUrl}/echart/metatree`
    },
    ufoe: {
        assLib: `${serverUrl}/analysis/assLib?yearmonth=`,
        profit: `${serverUrl}/analysis/profit?yearmonth=`
    },
    refer: {
        referScene: `${serverUrl}/acscene/list`,      // 获取refer的场景信息
        referDataUrl: `${serverUrl}/refbase_ctr/queryRefJSON`,        // refer 其他参照，调用refbase_ctr/queryRefJSON 10.3.14.240
        referDataUserUrl: `${serverUrl}/refbase_ctr/queryRefUserJSON`, // 人员参照API
        referOrgUrl: `${serverUrl}/accbook/org`,                      // 账簿组织参照
        referCurrencyUrl: `${serverUrl}/currency/queryRefJSON`,       // 币种参照
        referConsignAcc: `${serverUrl}/consignment/queryRefJSON`,     // 委托核算会计主体
        referConsignOrg: `${serverUrl}/consignment/org`,              // 委托核算委托主体
        referAccbodyUrl:`${serverUrl}/consignment/accbody`,           //存货明细账会计主体参照(已经废弃)
        referAccountUrl:`${serverUrl}/refbankacct/bankaccountref`     //银行账户参照
    },
    base: {
        setting: 'https://acc.yonyoucloud.com/workbench/sso/login.jsp',
        islogin: `${serverUrl}/login/status`,
        loginout: `${serverUrl}/login/index?SAMLRequest=logoutRequest&service=${httpHostUrl}/login/index`,
        loginindex: `${serverUrl}/login/index`,
        index: loginIndexUrl
    },
    basedoc: {
        accSubjectInit: `${serverUrl}/accsubject`,
        getAccElementFirstLevel: `${serverUrl}/accproperty/firstlevel`,
        getNewCode: `${serverUrl}/accsubject/`,
        accSubjectSave: `${serverUrl}/accsubject/save`,
        accSubject: `${serverUrl}/accsubject`,
        accbook: {
            getAll: `${serverUrl}/accbook/all`,
            getSubjectchart: `${serverUrl}/accbook/subjectchart`
        }
    },
  massProcess:{
    initgrid: `${serverUrl}/ficloud_pub/initgrid`,
    query:`${serverHost}otp/exmessage/query`,//批量重新生成凭证
    calc:`${serverHost}otp/exmessage/rebuild`,//重新计算
    continue:`${serverHost}otp/exmessage/continue`,//继续
    del:`${serverHost}otp/exmessage/delete`//删除
  },
    consignment: {
        queryAll: `${serverUrl}/consignment/queryAll`,    // 委托类型 查询所有
        delete: `${serverUrl}/consignment/delete`,        // 删除单挑数据
        save: `${serverUrl}/consignment/save`,            // 保存
        obtain: `${serverUrl}/consignment/autoObtain`     // 自动获取
    },
    auxdetail: {                                             // 辅助明细账
        querytree: `${serverUrl}/auxdetail/querytree`,      // 查询左侧树
        querydata: `${serverUrl}/auxdetail/querydata`,      // 查询右侧表格
        queryaux: `${serverUrl}/auxdetail/queryaux`         // 查询辅助类型
    },
    auxbalance: {                                           // 辅助余额表
        query: `${serverUrl}/auxbalance/query`
    },
    auxall: {                                             // 辅助余额表和辅助明细账，全辅助
        querybalance: `${serverUrl}/allaux/querybalance`, //辅助余额表
        querytree: `${serverUrl}/allaux/querytree`,       //辅助明细账查询左侧树
        querydata: `${serverUrl}/allaux/querydetail`,      //辅助明细账查询右侧表
        export: `${serverUrl}/allauxiliarydetailaccountExpt/export`,      //全辅助明细账导出
        exportBalance: `${serverUrl}/allauxiliarybalanceExpt/export`,      //全辅助余额表导出
    },
    auth: `${serverUrl}/auth`,   // 权限控制
    authQuery: `${serverHost}workbench/wb/empoweredApps/hasPerm`,
    fixedasset: {
        query: `${serverHost}asset/fixedasset/query`,               // 固定资产列表查询
        querybyid: `${serverHost}asset/fixedasset/querybyid`,       // 固定资产卡片查询
        save: `${serverHost}asset/fixedasset/save`,                 // 固定资产保存
        delete: `${serverHost}asset/fixedasset/delete`,             // 固定资产删除
        checkaccount: `${serverUrl}/assetbiz/checkaccount`,         // 对账
        createvoucher: `${serverHost}asset/fixedasset/voucher`,     // 生成凭证
        deletevoucher: `${serverHost}asset/fixedasset/deletevoucher`,   // 删除凭证
        minperiod: `${serverHost}asset/fixedasset/minperiod`,        // 最小未结账期间
        checkaccountmapsubject: `${serverHost}ficloud/checkaccountmapsubject`, // 对账设置查询
        querydevalues: `${serverHost}asset/fixedasset/querydevalues`,   // 减值记录查询
        deletedevalue: `${serverHost}asset/fixedasset/deletedevalue`,    // 减值记录删除
        getcleanvo: `${serverHost}asset/assetbiz/getcleanvo`,       // 清理查询
        assetsclean: `${serverHost}asset/assetbiz/assetsclean`,     // 清理
        cancelassetsclean: `${serverHost}asset/assetbiz/cancelassetsclean`, // 取消清理
        getenableperiod: `${serverHost}asset/assetbiz/getenableperiod`,   // 获取账簿启用期间
        download: `${serverHost}asset/fixedasset/download`,         // 模板下载
        import: `${serverHost}asset/fixedasset/import`,            // 导入
        export: `${serverHost}asset/fixedasset/export`,            // 导出
        getcontrollinfo: `${serverHost}asset/assetbiz/getcontrollinfo`    // 获取后台响应的信息
    },
        baseDocImport:{
            getdoctype:`${serverUrl}/ficloud_pub/getimportdocs`,
            download:`${serverUrl}/ficloud_pub/download`,
            import:`${serverUrl}/ficloud_pub/import`
    },
    noteimport: `${serverHost}/note/item/import`,           // 流水账 导入

    permission: {
        getScene: `${serverAccess}/permission/getScene`,    // 获取控制场景数据
        getAttr: `${serverAccess}/permission/getAttr`,      // 根据控制场景数据获取控制条件
        queryList: `${serverAccess}/permission/queryAll`,   // 查询左侧权限列表
        queryInfo: `${serverAccess}/permission/query`,      // 查询单条权限的信息
        deleteInfo: `${serverAccess}/permission/delete`,    // 删除单条信息
        save: `${serverAccess}/permission/save`,            // 保存
        queryRoles: `${serverAccess}/permission/queryRoles`,    // 查询角色
        queryUsers: `${serverAccess}/permission/queryUsers`,    // 查询用户
        queryBillTree: `${serverOtp}/echart/metatree`    // 查询公式编辑器中的单据字段树
    },

    fireport: `${serverHost}fireport/hcinteraction/intermediate`,    // 智能机器人

    itemlib: {
        initgridVoucher: `${serverHost}/account/initgrid/voucher`,
        ref: `${serverHost}/account/ref/data`,             //参照
        accountTemplate:`${serverHost}/account/template`,  //查询 || 删除 列表
        initGridMapping: `${serverHost}/account/initgrid/mapping`, //事项映射关系initGrid
        queryListData:`${serverHost}/account/mapping/all` , //事项映射关系列表
        deleteMapping:`${serverHost}/account/mapping/delete` , //事项映射关系单条删除
        save:`${serverHost}/account/mapping` , //事项映射关系保存卡片
        basedoc:`${serverHost}/account/basedoc` ,   //事项库 主数据 增删查改
    },
    cost: { //成本域
        query: `${serverUrl}/costdomain/query`, // 查询列表
        save: `${serverUrl}/costdomain/save`, // 保存成本域
        delete: `${serverUrl}/costdomain/delete`, // 删除成本域
    },
    entityMapping: { //关系模型
        entityItem: `${serverHost}/etl/mapping/metadata/`, //获取目标实体属性
        entitySave: `${serverHost}/etl/mapping`, //保存
        entityList: `${serverHost}/etl/mapping/list`, //列表
        entityData: `${serverHost}/etl/mapping/data/`, //详细信息
        entityDelete: `${serverHost}/etl/mapping/`, //删除
    },
    // inventory: { // 存货核算
    //     purchaseinSave: `${serverHost}fiaccount/purchasein/save`, // 采购入库单保存
    //     purchaseinQuery: `${serverHost}fiaccount/purchasein/list`,　// 采购入库单查询
    //     purchaseinDel: `${serverHost}fiaccount/purchasein/del`,　// 采购入库单删除
    //     transinSave: `${serverHost}fiaccount/transin/save`, // 调拨入库单保存
    //     transinQuery: `${serverHost}fiaccount/transin/list`,　// 调拨入库单查询
    //     transinDel: `${serverHost}fiaccount/transin/del`,　// 调拨入库单删除
    // },
    ac: { // 采购入库单
        save: `${serverHost}fiaccount/purchasein/save`, // 采购入库单保存
        querylist: `${serverHost}fiaccount/purchasein/list`,　// 采购入库单查询
        del: `${serverHost}fiaccount/purchasein/del`,　// 采购入库单删除
    },
    ad: { // 调拨入库
        save: `${serverHost}fiaccount/transin/save`, // 调拨入库单保存
        querylist: `${serverHost}fiaccount/transin/list`,　// 调拨入库单查询
        del: `${serverHost}fiaccount/transin/del`,　// 调拨入库单删除
    },
    ap: { //应付单
        querylist: `${serverHost}arap/ap/querycondition`, // 应付单列表查询
        save: `${serverHost}arap/ap/save`, // 应付单保存
        querybyid: `${serverHost}arap/ap/querybyid`, // 应付单查询(查询单条)
    },
    apy: { // 付款单
        querylist: `${serverHost}arap/paybill/querybyconditon`, // 付款单列表查询
        save: `${serverHost}arap/paybill/save`, // 付款单保存（单条）
        querybyid: `${serverHost}arap/paybill/querybyid`, // 付款单查询(查询单条)
        excel: `${serverHost}arap/paybill/import/excel`, // 导入excel
        downUrl: `${serverHost}arap/template/付款单导入模板.xls`
    },
    ar: { // 应收单
        querylist: `${serverHost}arap/ar/querycondition`, // 应收单列表查询
        save: `${serverHost}arap/ar/save`, // 应收单保存（单条）
        querybyid: `${serverHost}arap/ar/querybyid`, // 应收单查询(查询单条)
        // excel: `${serverHost}arap/paybill/import/excel`, // 导入excel
    },
    aps: { // 付款单
        querylist: `${serverHost}arap/receipt/querybyconditon`, // 收款单列表查询
        save: `${serverHost}arap/receipt/save`, // 收款单保存（单条）
        querybyid: `${serverHost}arap/receipt/querybyid`, // 收款单查询(查询单条)
        excel: `${serverHost}arap/receipt/import/excel`, // 导入excel
        downUrl: `${serverHost}arap/template/收款单导入模板.xls`
    },
    keep: { // 未知功能没有名称
        typelist: `${serverHost}note/type/query`, // 记事类型查询
        template: `${serverHost}note/billtemplet_ctr/queryfull`, // 模版查询
        listbutton: `${serverHost}note/action/query`, //列表按钮
        cardbutton: `${serverHost}note/action/query`, //卡片按钮
        querylist: `${serverHost}note/item/list`, // 列表查询
        querySum: `${serverHost}note/item/sum`, // 汇总信息
        querybyid: `${serverHost}note/item/view`, //记事查看
        save: `${serverHost}note/item/save`, // 记事保存
        del: `${serverHost}note/item/del`, // 记事删除
        fileview: `${serverHost}/note/item/file/view`, // 附件查看图片
        downUrl: `${serverHost}note/md/entity/dataxls?code=`

    },
  stock: { // 存货明细账
    querytree: `${serverHost}fiaccount/detail/querytree`, //
    querydetail: `${serverHost}fiaccount/detail/querydetail`, //
  },
  balancevaried: { // 应付余额表，应收余额表
    querypayment: `${serverHost}arap/balance/ap`, //
    queryreceive: `${serverHost}arap/balance/ar`, //
  },
  distSetting:{//分发设置
    queryList:`${serverHost}etl/distcfg/list`,//查询
    edit:`${serverHost}etl/distcfg/view`,//查看
    save:`${serverHost}etl/distcfg/save`,//保存
    del:`${serverHost}etl/distcfg/del`,//删除

  },
  distLog:{//分发日志
      queryList:`${serverHost}etl/distlog/query`,//查询列表
      putkfk:`${serverHost}etl/distlog/putkfk`,//推KAFKA
      putdown:`${serverHost}etl/distlog/putdown`,//推下游
  }

};

export default Config;
