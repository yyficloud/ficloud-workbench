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

export function queryAllAcc(callback) {
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

	const url = getAccBookURL(this.outEnvironment) + '?' + Date.now();
	return fetch(url, opts)
		.then(response => response.json()).then((data) => {
			if (data.success) {
				that.accBookData = Object.assign(that.accBookData, data.data);
				that.accBook = data.data[0] && data.data[0].id ? that.accBookData[0].id : '';
				localStorage.setItem('accBookData', JSON.stringify(that.accBookData));
				if(typeof callback ==='function' ){
					callback();
				}
			} else {
				if(typeof callback ==='function' ){
					callback();
				}
			}
		})
		.catch((err) => {
			if(typeof callback ==='function' ){
				callback();
			}
		});
}
export function queryDefaultAcc(callback) { // eslint-disable-line class-methods-use-this
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

	const url = getAccBookDefaultURL(this.outEnvironment) + '?' + Date.now();
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
					callback();
				}
			}
		})
		.catch((err) => {
			if(typeof callback ==='function' ){
				callback();
			}
		});
}


export function getAccBookObj(id) {
	let obj,
		index = 0;
	const targetData = this.getAllAcc.find((prod, i) => {
		if (prod.id == id||this.accBook) {
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
export function getAccBookTree(root) {
	var resultRoot=[];
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
function isInArray(arrays,current){
	const isIn = arrays.find((prod, i) => {
		if (prod.pk_org_id === current.parentOrg) {
			return true;
		}
		return false;
	});
	return isIn;
}
