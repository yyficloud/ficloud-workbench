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


