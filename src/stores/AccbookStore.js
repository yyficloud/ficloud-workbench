import {toJS, observable,computed,action} from 'mobx';
import {
	getAccBookURL,
	getAccBookDefaultURL
} from './../utils/utils.urls';

/**
 * Fetch API credentials 选项
 * - false 不往Fetch API中添加credentials选项
 * - same-origin 在请求中添加Cookie
 */
const FETCH_CREDENTIALS_OPTION = 'same-origin';

/** 配置Fetch API的credentials参数 */
function appendCredentials(opts) {
	if (FETCH_CREDENTIALS_OPTION) {
		opts.credentials = FETCH_CREDENTIALS_OPTION;
	}
	return opts;
}

class AccbookStore{
	constructor() {
		// this.queryAllAcc();
		// this.queryDefaultAcc();
	}
	// 账簿
	@observable accBookData = [];
	@observable accBook = '';
	@observable isAccBook = false;
	@observable outEnvironment = process.env.NODE_ENV;
	@computed get getAllAcc() {
		return this.accBookData;
	}
	// 获取账簿, 所有使用者通过这个接口调用
	@computed get getAccBook() {
		return this.accBook;
	}
	//账簿树
	@computed get getAccBookTree() {
		var resultRoot=[];
		let root = this.accBookData
		root.map((val)=>{val.children=null;});
		for ( var i = 0; i < root.length; i++){
			var ri = root[i];
			if (ri.parentOrg == ''||ri.parentOrg == null||(!this.isInArray(root,ri))){
				resultRoot.push (ri);
			}else{
				for ( let j = 0; j < root.length; j++){
					let rj = root[j];
					if (rj.pk_org_id == ri.parentOrg)
					{
						rj.children = !rj.children ? [] : rj.children;
						rj.children.push (ri);
						break;
					}
				}
			}
		}
		return resultRoot;
	}
	@computed get getAccBookObj() {
		let obj,
			index = 0;
		const targetData = this.getAllAcc.find((prod, i) => {
			if (prod.id == this.accBook) {
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
		return obj;
	}
	@action
	getDefaultAccObj(id) {
		let obj,
			index = 0;
		const targetData = this.getAllAcc.find((prod, i) => {
			if (prod.id == id) {
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
		return obj;
	}
// 查询所有账簿数据
	@action
	queryAllAcc(callback) { // eslint-disable-line class-methods-use-this
		let that = this;
		const opts = {
			method: 'GET',
			headers: {
				'Content-type': 'application/json'
			},
			mode: 'cors',
			// body: JSON.stringify()
		};
		appendCredentials(opts);

		const url = getAccBookURL(this.outEnvironment) + "?" + Date.now();
		return fetch(url, opts)
			.then(response => response.json()).then((data) => {
				if (data.success) {
					that.accBookData = Object.assign(that.accBookData, data.data);
					that.accBook = data.data[0] && data.data[0].id ? that.accBookData[0].id : ''
					localStorage.setItem('accBookData', JSON.stringify(that.accBookData));
					if(typeof callback ==='function' ){
						callback()
					}
				} else {
					if(typeof callback ==='function' ){
						callback()
					}
				}
			})
			.catch((err) => {
				if(typeof callback ==='function' ){
					callback()
				}
			});
	}
	// 查询默认账簿数据
	@action
	queryDefaultAcc(callback) { // eslint-disable-line class-methods-use-this
		let that = this;
		const opts = {
			method: 'GET',
			headers: {
				'Content-type': 'application/json'
			},
			mode: 'cors',
			// body: JSON.stringify()
		};
		appendCredentials(opts);

		const url = getAccBookDefaultURL(this.outEnvironment) + "?" + Date.now();
		return fetch(url, opts)
			.then(response => response.json()).then((data) => {
				let defaultAcc;
				if (data.data != null && data.data.id) {
					let target = this.accBookData.find((prod, i) => {
						if (prod.id === data.data.id) {
							return true;
						}
						return false;
					});
					if (target) {
						defaultAcc = data.data.id;
					}
				}
				if(defaultAcc){
					that.accBook = defaultAcc ;
					if(typeof callback === 'function'){
						callback()
					}
				}
			})
			.catch((err) => {
				if(typeof callback ==='function' ){
					callback()
				}
			});
	}
	// @action
	// queryDefaultAcc2(callback) {
	// 	let that = this;
	// 	$.ajax({
	// 		type: 'GET',
	// 		url: getAccBookURL(this.outEnvironment) + "?" + Date.now(),
	// 		dataType: 'json',
	// 		// async: false,
	// 		crossDomain: true,
	// 		xhrFields: {
	// 			withCredentials: true
	// 		},
	// 		contentType: 'application/json',
	// 		success: (data) => {
	// 			if (data.success) {
	// 				that.accBookData = Object.assign(that.accBookData, data.data);
	// 				that.accBook = data.data[0] && data.data[0].id ? that.accBookData[0].id : ''
	// 				localStorage.setItem('accBookData', JSON.stringify(that.accBookData));
	// 				localForage
	// 					.setItem('accBookData', that.accBookData)
	// 					.then(() => localForage.getItem('accBookData'))
	// 					.then((value) => {
	// 						console.log('localStorage.accBookData', value);
	// 						// we got our value
	// 					}).catch((err) => {
	// 					// we got an error
	// 				});
	// 				if(typeof callback ==='function' ){
	// 					callback()
	// 				}
	// 			} else {
	// 				if(typeof callback ==='function' ){
	// 					callback()
	// 				}
	// 				// this.showError(!data.message ? "查询失败" : data.message);
	// 			}
	// 		},
	// 		error: (xhr, status, err) => {
	// 			if(typeof callback ==='function' ){
	// 				callback()
	// 			}
	// 			// this.showError(`数据请求失败,错误信息:${err.toString()}`);
	// 		}
	// 	});
	// }
    //
	// // 查询默认账簿数据
	// @action
	// queryDefaultAcc2(callback) {
	// 	let that = this;
	// 	$.ajax({
	// 		type: 'GET',
	// 		url: getAccBookDefaultURL(this.outEnvironment) + "?" + Date.now(),
	// 		dataType: 'json',
	// 		// async: false,
	// 		xhrFields: {
	// 			withCredentials: true
	// 		},
	// 		crossDomain: true,
	// 		contentType: 'application/json',
	// 		success: (data) => {
	// 			let defaultAcc;
	// 			if (data.data != null && data.data.id) {
	// 				let target = this.accBookData.find((prod, i) => {
	// 					if (prod.id === data.data.id) {
	// 						return true;
	// 					}
	// 					return false;
	// 				});
	// 				if (target) {
	// 					defaultAcc = data.data.id;
	// 				}
	// 			}
	// 			if(defaultAcc){
	// 				that.accBook = defaultAcc ;
	// 				if(typeof callback === 'function'){
	// 					callback()
	// 				}
	// 			}
	// 		},
	// 		error: (xhr, status, err) => {
	// 			// this.showError(`数据请求失败,错误信息:${err.toString()}`);
	// 		}
	// 	});
	// }
	@action
	isInArray(arrays,current){
		const isIn = arrays.find((prod, i) => {
			if (prod.pk_org_id === current.parentOrg) {
				return true;
			}
			return false;
		});
		return isIn;
	}
}
export default new AccbookStore();
