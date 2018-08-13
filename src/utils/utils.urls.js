/**
 * 配置后端服务器的IP和端口
 * 可以通过传递env，来确定配置
 * config.js举例
 * ```
 * G_SCHEME = 'https';
 * G_HOST_PORT = 'acc.yonyoucloud.com';
 * G_PATH_PREFIX = '/ficloud';
 * G_OTP_PATH_PREFIX = '/otp'; // 智能会计平台微服务
 * G_ASSET_PATH_PREFIX = '/asset'; // 固定资产
 * ```
 */
var Config = require('./config');

// 为输入的相对路径组装完整的URL
// scheme:[//[user:password@]host[:port]][/]path[?query][#fragment]
const makeURL = (path,env) => {
	const outEnvironment = Config[env || 'dev'];
	let { G_SCHEME, G_HOST_PORT, G_PATH_PREFIX } = outEnvironment;
	return `${G_SCHEME}://${G_HOST_PORT}${G_PATH_PREFIX}${path}`;
};

// 账簿 查询接口
export const getAccBookURL = env => makeURL('/accbook/refallbooks',env);
export const getAccBookDefaultURL= env => makeURL('/user/defaultaccbook',env);

class UrlConfig {
    constructor() {

    }
}

export default new UrlConfig();
