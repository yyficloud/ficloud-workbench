// findPath() Copy from http://react-component.github.io/tree-select/examples/basic.html
//(menus, 'children', 'menuItemId', id)
export function findPath(datas, childrenKey, compareKey, compareValue) {
	const paths = [];
	function loop(children) {
		for (let i = 0, l = children.length; i < l; i++) {
			let result = false;
			const child = children[i];
			paths.push(child);
			if (child[childrenKey]) {
				result = loop(child[childrenKey]);
			}
			let value;
			try {
				value = compareKey.split('.').reduce((obj, key) => {
					return obj[key];
				}, child);
			} catch (e) {
				console.log(e);
			}

			if (value === compareValue) {
				result = true;
			}else{
				//需要处理value以数字和下划线为前缀的情况
				if(typeof value === 'string'){
					let valueArr = value.split('_');
					if (valueArr.length > 1 && valueArr[0].match('^[1-9]\\d*|0$')) {
						try{
							value = value.substring(valueArr[0].length + 1,value.length);
							if (value === compareValue) {
								result = true;
							}
						}catch (e) {
							console.log(e);
						}
					}
				}
			}
			if (result) {
				return result;
			} else {
				paths.pop();
			}
		}
		return false;
	}
	loop(datas);
	return paths;
}


export function GetCookie(key){
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
