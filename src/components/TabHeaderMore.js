import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';

@observer
export default class TabHeaderMore extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        let { isShow, currentCode, onActive, moreList } = this.props;
        console.log(moreList);
        return (
            <div className="main-tab-more" style={{ display: isShow? 'block': 'none' }}>
                <div className="btn-group">
                    <button type="button" className="dropdown-toggle noprint"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="caret" />
                        <span className="sr-only">Toggle Dropdown</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-list noprint">
                        {
                            moreList.map(item => {
                                return (
                                    <li key={item.code} className={currentCode == item.code? 'active': ''}>
                                        <a href="#" onClick={() => onActive(item.code)}>
                                            {item.name}
                                        </a>
                                    </li>
                                );
                            })
                        }
                        <li className="close-all">
                            <a href="#" onClick={() => onActive('closeAll')}>
                                关闭全部
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
