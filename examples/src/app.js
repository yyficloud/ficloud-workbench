/* eslint react/prop-types: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import WorkBench from 'ficloud-workbench';
import './example.less';


ReactDOM.render(
	<div>
		<WorkBench value={'我是test'} />
	</div>,
	document.getElementById('example')
);
