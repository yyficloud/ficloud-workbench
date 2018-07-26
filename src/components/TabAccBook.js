/**
 * Created by liuyyg on 2017/5/8.
 */
/**
 *  账簿切换组件
 */
import React from 'react';
import { observer } from 'mobx-react';
import InputRef from './../common/InputRef';
import RefAccBook from './../common/RefAccBook';

@observer
class TabAccbook extends React.Component {
    constructor(props) {
        super(props);
		this.accbookStore = this.props.accbookStore;
        this.state = {};
        this.accHide = this.accHide.bind(this);
        this.accChanged = this.accChanged.bind(this);
    }

    componentDidMount() {
    }

    accHide() {
    }

    accChanged (data) {
        let value = data.id;
        if(this.props.onChange)
            {this.props.onChange(value);}
    }

    render() {
        const {isAccBook,getAccBookTree,getAccBookObj,getAccBook} = this.accbookStore;
        return (
            <div style={{ display: isAccBook? 'inline-block': 'none' }} className={this.props.className ? this.props.className + ' global-accbook' : 'global-accbook'} >
                <span className="mr5">账簿：</span>
                <InputRef placeholder={getAccBookObj&&getAccBookObj.name?getAccBookObj.name:''} ref="periodRef" onChanged={this.accChanged}>
                    <RefAccBook ref="innerAcc" default = {getAccBook} accBooks={getAccBookTree}/>
                </InputRef>
            </div>
        );
    }
}

export default TabAccbook;
