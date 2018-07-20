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
import AccbookStore from './../stores/AccbookStore';
const accbookStore = AccbookStore;

@observer
class TabAccbook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            accBooks: accbookStore.getAllAcc,
            default:accbookStore.getAccBook,
            accbook:accbookStore.getDefaultAccObj(accbookStore.getAccBook)
        };
        this.accHide = this.accHide.bind(this);
        this.accChanged = this.accChanged.bind(this);
        this.setValue = this.setValue.bind(this);
		this.isInArray = this.isInArray.bind(this);
		this.convert = this.convert.bind(this);
    }

    componentDidMount() {
        this.setState({ accBooks: this.convert (this.state.accBooks) });
    }

    accHide() {
    }

    accChanged (data) {
        let value = data.id;
        if(this.props.onChange)
            {this.props.onChange(value);}
        this.setState({ default:value,accbook:accbookStore.getDefaultAccObj(value) });
        accbookStore.accBook = value;
    }

    setValue (value) {
        if (value !== this.state.default) {
            this.setState({
                default:value,
                accbook:accbookStore.getDefaultAccObj(value)
            }, ()=> {
            });
            accbookStore.accBook = value;
        }
    }
    isInArray(arrays,current){
        const isIn = arrays.find((prod, i) => {
            if (prod.pk_org_id === current.parentOrg) {
                return true;
            }
            return false;
        });
        return isIn;
    }
    convert (root) {
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
    render() {
        const isAccBook = accbookStore.isAccBook;
        return (
            <div style={{ display: isAccBook? 'inline-block': 'none' }} className={this.props.className ? this.props.className + ' global-accbook' : 'global-accbook'} >
                <span className="mr5">账簿：</span>
                <InputRef placeholder={this.state.accbook&&this.state.accbook.name?this.state.accbook.name:''} ref="periodRef" onChanged={this.accChanged}>
                    <RefAccBook ref="innerAcc" default = {this.state.default} accBooks={this.state.accBooks}/>
                </InputRef>
            </div>
        );
    }
}

export default TabAccbook;
