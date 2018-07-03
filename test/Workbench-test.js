'use strict';
/* global describe, it, beforeEach */
/* eslint react/jsx-boolean-value: 0 */

var jsdomHelper = require('../testHelpers/jsdomHelper');

var sinon = require('sinon');
var unexpected = require('unexpected');
var unexpectedDom = require('unexpected-dom');
var unexpectedSinon = require('unexpected-sinon');
var unexpectedReact = require('unexpected-react');
var expect = unexpected
	.clone()
	.installPlugin(unexpectedDom)
	.installPlugin(unexpectedSinon)
	.installPlugin(unexpectedReact)
	.installPlugin(require('../testHelpers/nodeListType'));

jsdomHelper();

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-dom/test-utils');

var Select = require('../src').default;

// The displayed text of the currently selected item, when items collapsed
var DISPLAYED_SELECTION_SELECTOR = '.ficloud-bench';

var ARROW_UP = { keyCode: 38, key: 'ArrowUp' };
var ARROW_DOWN = { keyCode: 40, key: 'ArrowDown' };
var KEY_ENTER = { keyCode: 13, key: 'Enter' };
var KEY_SPACE = { keyCode: 32, key: 'Space' };

class PropsWrapper extends React.Component {

	constructor(props) {
		super(props);
		this.state = props || {};
	}

	setPropsForChild(props) {
		this.setState(props);
	}

	getChild() {
		return this.child;
	}

	render() {
		var Component = this.props.childComponent; // eslint-disable-line react/prop-types
		return <Component {...this.state} ref={(ref) => this.child = ref} />;
	}
}
describe('Workbench', () => {

});
