import {toJS, observable,computed,action} from 'mobx';
import $ from 'jquery'
import localForage from "localforage";
import {
	getAccBookURL,
	getAccBookDefaultURL
} from './../utils/utils.urls';

class AccbookStore{
	constructor() {
		this.queryAllAcc();
		this.queryDefaultAcc();
	}
	// 账簿
	@observable accBookData = [];
	@observable defaultAcc = '';
	@observable isAccBook = true;
	@computed get getAllAcc() {
		return this.accBookData;
	}
	// 获取账簿, 所有使用者通过这个接口调用
	@computed get getAccBook() {
		return this.accBook;
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
	queryAllAcc(callback) {
		let that = this;
		$.ajax({
			type: 'GET',
			url: getAccBookURL + "?" + Date.now(),
			dataType: 'json',
			async: false,
			contentType: 'application/json',
			success: (data) => {
				if (data.success) {
					that.accBookData = Object.assign(that.accBookData, data.data);
					localStorage.setItem('accBookData', JSON.stringify(that.accBookData));
					localForage
						.setItem('accBookData', that.accBookData)
						.then(() => localForage.getItem('accBookData'))
						.then((value) => {
							console.log('localStorage.accBookData', value);
							// we got our value
						}).catch((err) => {
						// we got an error
					});
				} else {
					// this.showError(!data.message ? "查询失败" : data.message);
				}
			},
			error: (xhr, status, err) => {
				// this.showError(`数据请求失败,错误信息:${err.toString()}`);
			}
		});
	}

	// 查询默认账簿数据
	@action
	queryDefaultAcc(callback) {
		let that = this;
		$.ajax({
			type: 'GET',
			url: getAccBookDefaultURL + "?" + Date.now(),
			dataType: 'json',
			async: false,
			contentType: 'application/json',
			success: (data) => {
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
				that.accBook = defaultAcc || (that.accBookData[0] && that.accBookData[0].id ? that.accBookData[0].id : '');
				console.log(`params default acc:${that.accBookDefault}`);
			},
			error: (xhr, status, err) => {
				// this.showError(`数据请求失败,错误信息:${err.toString()}`);
			}
		});
	}

}
// export default AccbookStore
export default new AccbookStore();
