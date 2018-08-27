/*
 * 科目、科目级次参照组件
 */
import React from 'react';
import Popup from './Popup';

class InputRef extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 'none',
        };
    }

    static defaultProps = {
        strategy: 'bottom left'
    }

    componentDidMount() {
    }

    toggle = () => {
        this.setState({ show: this.state.show == 'none' ? 'block' : 'none' });
    }

    hide = () => {
        this.setState({ show: 'none' });
    }

    handleReset = () => {
        this.onText('');
        this.selector.refs.instance.handleReset();
    }
    handleSet = (begin,end) => {
        this.selector.refs.instance.handleSet(begin,end);
    }
    handleOk = (begin,end) => {
        this.selector.refs.instance.handleOk(begin,end);
    }

    onText = (text) => {
        this.setState({ text: text });
    }

    renderChildren = (props) => {
        return React.Children.map(props.children, child => {
            return React.cloneElement(child, {
                ref:(selector) => { this.selector = selector;},
                hide: this.hide,
                show: this.state.show,
                initData: this.props.initData,
                onText: this.onText,
                onChanged: this.props.onChanged,
            });
        });
    }

    render() {
        return (
            <div onClick={this.toggle}>
                <div className="ssc-input">
                    <input readOnly="readonly" placeholder={this.props.placeholder} value={this.props.placeholder} title={this.props.placeholder}/>
                </div>
                <Popup strategy={this.props.strategy} gap={0}>
                    <div style={{ display: this.state.show, width: this.props.width }}
                        className="input-dropdown">
                        {this.renderChildren(this.props)}
                    </div>
                </Popup>
            </div>
        );
    }
}

export default InputRef;
