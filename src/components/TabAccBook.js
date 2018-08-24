/**
 * Created by liuyyg on 2017/5/8.
 */
/**
 *  账簿切换组件
 */
import React from 'react';
import InputRef from './../common/InputRef';
import RefAccBook from './../common/RefAccBook';

class TabAccbook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.accHide = this.accHide.bind(this);
        this.accChanged = this.accChanged.bind(this);
    }

    componentDidMount() {
    }

    accHide() {
    }

    accChanged (data) {
        let value = data;//.id;
		if (this.props.onChange) {
			this.props.onChange(value);
		}
    }

    render() {
        const {isAccBook,accBookData,accBookObj,accBook} = this.props;
        return (
            <div style={{ display: isAccBook? 'inline-block': 'none' }} className={this.props.className ? this.props.className + ' global-accbook' : 'global-accbook'} >
                <span className="mr5">账簿：</span>
                <InputRef placeholder={accBookObj&&accBookObj.name?accBookObj.name:''} ref="periodRef" onChanged={this.accChanged}>
                    <RefAccBook ref="innerAcc" default = {accBook} accBooks={accBookData}/>
                </InputRef>
            </div>
        );
    }
}

export default TabAccbook;
