/**
 * Created by lyy on 2017/8/29.
 * 公共JS
 */
//多页签监控, 初始化即创建一个parent的父框架消息管理器
var messenger = new window.Messenger('parent', 'fc');

//监听器的回调方法
export function listen(callback) {
    messenger.listen(callback);
}

//获取地址栏参数
export function GetQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}
