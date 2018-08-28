import {
	getAccBookURL,
	getAccBookDefaultURL
} from './../utils/utils.urls';
import * as types from '../constants/ActionTypes';
/**
 * Fetch API credentials 选项
 * - false 不往Fetch API中添加credentials选项
 * - same-origin 在请求中添加Cookie
 */
const FETCH_CREDENTIALS_OPTION = 'include';

/** 配置Fetch API的credentials参数 */
function appendCredentials(opts) {
	if (FETCH_CREDENTIALS_OPTION) {
		opts.credentials = FETCH_CREDENTIALS_OPTION;
	}
	return opts;
}

export function queryAllAcc(outEnvironment,callback) {
	return (dispatch) => {
	const opts = {
		method: 'GET',
		headers: {
			'Content-type': 'application/json'
		},
		mode: 'cors',
	};
	appendCredentials(opts);

	const url = getAccBookURL(outEnvironment) + '?' + Date.now();
	return fetch(url, opts)
		.then(response => response.json()).then((data) => {
			if (data.success) {
				dispatch(getAccBookTree(data.data));
				dispatch(returnAccBookData(data.data));
				// localStorage.setItem('accBookData', JSON.stringify(data.data));
				// if(typeof callback ==='function' ){
				// 	callback();
				// }
			} else {
				if(typeof callback ==='function' ){
					callback();
				}
			}
		})
		.catch((err) => {
			console.log(err);
			if(typeof callback ==='function' ){
				callback();
			}
		});
	};
}
export function queryDefaultAcc(outEnvironment,callback) { // eslint-disable-line class-methods-use-this
	return (dispatch) => {
		const opts = {
			method: 'GET',
			headers: {
				'Content-type': 'application/json'
			},
			mode: 'cors',
		};
		appendCredentials(opts);

		const url = getAccBookDefaultURL(outEnvironment) + '?' + Date.now();
		return fetch(url, opts)
			.then(response => response.json()).then((data) => {
				let defaultAcc;
				if (data.data != null && data.data.id) {
					defaultAcc = data.data.id;
				}
				if (defaultAcc) {
					dispatch(returnAccBook(defaultAcc));
					if (typeof callback === 'function') {
						callback();
					}
				}
			})
			.catch((err) => {
				if (typeof callback === 'function') {
					callback();
				}
			});
	};
}


export function getAccBookObj(id,accbookData) {
	return (dispatch) => {
		let obj,
			index = 0;
		const targetData = accbookData.find((prod, i) => {
			if (prod.id === id) {
				index = i;
				return true;
			}
			return false;
		});
		if (targetData) {
			obj = {
				id: targetData.id,
				name: targetData.name,
				code: targetData.code
			};
		}
		dispatch(returnAccBook(obj));
		// return {
		// 		type: types.LOAD_DEFAULTACCBOOK,
		// 		data: {
		// 			accBookObj:obj,
		// 			accBook:id
		// 		}
		// 	};
	};
}
function returnAccBook(data){
	return {
		type: types.LOAD_DEFAULTACCBOOK,
		data: {
			accBook: data.id,
			accBookObj:data
		}
	};
}
function returnAccBookData(data){
	let accBookObj = data && data.length > 0 && data[0] ? data[0] : null;
	return {
		type: types.LOAD_ACCBOOKDATA,
		data: {
			accBookData:data,
			accBookObj:accBookObj,
			accBook: accBookObj && accBookObj.id ? accBookObj.id : ''
		}
	};
}
function returnAccBookTree(resultRoot){
	return {
		type: types.LOAD_ACCBOOKTREE,
		data: resultRoot
	};
}

function getAccBookTree(root) {
	return (dispatch) => {
		var resultRoot = [];
		function isInArray(arrays, current) {
			const isIn = arrays.find((prod, i) => {
				if (prod.pk_org_id === current.parentOrg) {
					return true;
				}
				return false;
			});
			return isIn;
		}

		root.map((val) => {
			val.children = null;
		});
		for (var i = 0; i < root.length; i++) {
			var ri = root[i];
			if (ri.parentOrg == '' || ri.parentOrg == null || isInArray(root, ri)) {
				resultRoot.push(ri);
			} else {
				for (let j = 0; j < root.length; j++) {
					let rj = root[j];
					if (rj.pk_org_id == ri.parentOrg) {
						rj.children = !rj.children ? [] : rj.children;
						rj.children.push(ri);
						break;
					}
				}
			}
		}
		dispatch(returnAccBookTree(resultRoot));
		// return {
		// 	type: types.LOAD_ACCBOOKTREE,
		// 	data: resultRoot
		// };
	};
}

export const updateAccbook = data => dispatch => (
	dispatch({
		type: types.UPDATE_DEFAULTACCBOOK,
		data:{
			accBook:data.id,
			accBookObj:data
		}
	})
);
