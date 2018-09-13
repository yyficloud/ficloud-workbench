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
function GetCookie(key){
	let value = '';
	let cookies = document.cookie;
	if (cookies) {
		let arr = cookies.split('; ');
		if (arr.length > 0) {
			let cookie = arr.find((val, index) => {
				if (val.indexOf(key) == 0) {
					return true;
				}
				return false;
			});
			if (cookie) {
				value = cookie.split(key+'=').length > 1 ? cookie.split(key+'=')[1] : '';
			}
		}
	}
	return value;
}
function closest(el, selector) {
	const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

	while (el) {
		if (matchesSelector.call(el, selector)) {
			return el;
		} else {
			el = el.parentElement;
		}
	}
	return null;
}
function getOffset (el) {
	const box = el.getBoundingClientRect();

	return {
		top: box.top + window.pageYOffset - document.documentElement.clientTop,
		left: box.left + window.pageXOffset - document.documentElement.clientLeft
	};
}
