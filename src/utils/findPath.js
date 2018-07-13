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


export function findPathParent(value, data) {
	const sel = [];
	function loop(selected, children) {
		for (let i = 0; i < children.length; i += 1) {
			const item = children[i];
			if (selected === item.code) {
				sel.push(item);
				return;
			}
			if (item.children) {
				loop(selected, item.children, item);
				if (sel.length) {
					sel.push(item);
					return;
				}
			}
		}
	}
	loop(value, data);
	return sel;
}
