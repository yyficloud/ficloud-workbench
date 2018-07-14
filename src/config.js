
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

// 友账表
let Config = {
    FRAME_PAGE,
    serverUrl,
    localUrl,
    serverHost,
    loginRedirect:loginIndexUrl,
    // 首页
    commontemplate: `${serverUrl}/customviewctrl/query`,   // 账表通用列表模型获取
};

export default Config;
