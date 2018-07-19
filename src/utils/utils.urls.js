/**
 * 配置后端服务器的IP和端口
 * 可以通过在生产环境中创建`config.js`文件，来覆盖这些配置。
 * config.js举例
 * ```
 * G_SCHEME = 'https';
 * G_HOST_PORT = 'acc.yonyoucloud.com';
 * G_PATH_PREFIX = '/ficloud';
 * G_OTP_PATH_PREFIX = '/otp'; // 智能会计平台微服务
 * G_ASSET_PATH_PREFIX = '/asset'; // 固定资产
 * ```
 */

const { NODE_ENV } = process.env;

const DEFAULT_SCHEME = NODE_ENV === 'production'
  ? 'https' // 默认使用友报账服务器，这也是ssc30-admin一开始就为了这个产品开发的
  : 'http'; // 默认使用本地开发环境，使用swagger作为后端，而且默认使用友报账后端
const DEFAULT_HOST_PORT = NODE_ENV === 'production'
  ? 'acc.diwork.com'
  : '172.20.4.220';
const DEFAULT_PATH_PREFIX = NODE_ENV === 'production'
  ? '/ficloud'
  : '/ficloud';
export const SCHEME = typeof G_SCHEME === 'undefined'
  ? DEFAULT_SCHEME
  : G_SCHEME;
export const HOST_PORT = typeof G_HOST_PORT === 'undefined'
  ? DEFAULT_HOST_PORT
  : G_HOST_PORT;
export const PATH_PREFIX = typeof G_PATH_PREFIX === 'undefined'
  ? DEFAULT_PATH_PREFIX
  : G_PATH_PREFIX;

// 为输入的相对路径组装完整的URL
// scheme:[//[user:password@]host[:port]][/]path[?query][#fragment]
const makeURL = path => `${SCHEME}://${HOST_PORT}${PATH_PREFIX}${path}`;

// 参照 查询接口
export const getAccBookURL = makeURL('/accbook/refallbooks');
export const getAccBookDefaultURL = makeURL('/user/defaultaccbook');
/**
 * 应用层存储服务器端API地址
 * TODO 使用这种方式是否太pure tech了？
 * https://github.com/GoogleChrome/two-token-sw/blob/master/demo/integrated/src/main/java/com/google/config/UrlConfig.java
 */
class UrlConfig {
    constructor() {
        console.log('[UrlConfig] constructor'); // eslint-disable-line no-console

        this.defaultScheme = process.env.NODE_ENV === 'production'
          ? 'https' // 默认使用友账表正式环境
          : 'http'; // 默认使用本地开发环境，使用swagger作为后端，而且默认使用友报账后端
        this.defaultHostPort = process.env.NODE_ENV === 'production'
          ? 'acc.yonyoucloud.com'
          : '172.20.4.220';
        this.defaultPathPrefix = process.env.NODE_ENV === 'production'
          ? '/ficloud'
          : '/ficloud';

        // G_* 这几个变量在index.html中定义，或者index.html引用的config.js中定义的全局变量。
        this.scheme = typeof G_SCHEME === 'undefined'
          ? this.defaultScheme
          : G_SCHEME;
        this.hostPort = typeof G_HOST_PORT === 'undefined'
          ? this.defaultHostPort
          : G_HOST_PORT;
        this.pathPrefix = typeof G_PATH_PREFIX === 'undefined'
          ? this.defaultPathPrefix
          : G_PATH_PREFIX;
    }
}

export default new UrlConfig();
