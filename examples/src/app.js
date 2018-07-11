/* eslint react/prop-types: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import WorkBench from 'ficloud-workbench';
import './example.less';
// const state = { value: {title:'凭证测试',url:'http://127.0.0.1:4001/home_index.html?version=2b1cb354dc80889a4979&accbook=6B3962AB-E851-4EAE-A3B9-8FA02A95C5AE&code=addvoucher&params=%7B%7D#/voucher/edit'} };
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: {title:'凭证测试222',url:'http://127.0.0.1:4001/home_index.html?version=2b1cb354dc80889a4979&accbook=6B3962AB-E851-4EAE-A3B9-8FA02A95C5AE&code=addvoucher&params=%7B%7D#/voucher/edit'}
		};
	};
	updateValue (value) {
		this.setState({ value });
	};
	render () {
		const { value } = this.state;
		return <div>
			<div className={'workbench-title'}>
				<h2>{value.title}</h2>
				<p>{'面包屑>'+value.title}</p>
			</div>
			<WorkBench value={value} /></div>;
	}
};
ReactDOM.render(
	<App />,
	document.getElementById('example')
);
