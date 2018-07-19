import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
const CONTAINER_CLASS_NAME = 'tw-overlay-container';
const OVERLAY_CLASS_NAME ='tw-overlay';
class Overlay extends Component {
	constructor(props){
		super(props);
	}
	static propTypes = {
		children: PropTypes.node
	}
	componentDidMount() {
		this.updateOverlay();
	}

	componentDidUpdate () {
		this.updateOverlay();
	}

	componentWillUnmount() {
		if (this._element) {
			ReactDOM.unmountComponentAtNode(this._element);
			if (this._element.parentNode) {
				this._element.parentNode.removeChild(this._element);
			}
		}
	}

	updateOverlay() {
		if (!this._element) {
			this._element = document.createElement('div');
			this._element.className = CONTAINER_CLASS_NAME;
			document.body.appendChild(this._element);
		}
		var overlay = (
			<div className={OVERLAY_CLASS_NAME}>
				{this.props.children}
			</div>
		);
		ReactDOM.render(overlay, this._element);
	}

	render () {
		return (
			<tw-overlay style={{ display: 'none' }} />
		);
	}

}

export default Overlay;
