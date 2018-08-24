/**
 *账簿树弹出层
 */
import React from 'react';
import OnClickOutside from 'react-onclickoutside';
import Tree from 'rc-tree';
const TreeNode = Tree.TreeNode;

class RefAccBook extends React.Component {
  constructor(props) {
    super(props);
    this.self = this;
    this.state = {
        inputValue:'',
        expandedKeys: [],
        autoExpandParent: true,
        selected:this.props.default
  };
  }

  componentDidMount() {
    // this.handleOk('by');
  }

  //每次接受新的props触发
  componentWillReceiveProps(nextProps) {
      if (nextProps.show == 'none') {
          if (nextProps.default != this.state.selected) {
              // let dObj = accbookStore.getDefaultAccObj(nextProps.default);
              // this.props.onText(dObj ? dObj.name: '');
              this.setState({ selected: nextProps.default });
          }
      }
  }

  handleClickOutside = evt => {
    this.props.hide();
  }

  handleOk = (accbook) => {
    this.props.onText(accbook.name);
    this.props.onChanged(accbook);
    this.props.hide();
  }
  onChange=(event)=> {
    this.filterKeys = [];
    this.setState({
    inputValue: event.target.value,
});
}
onKeyDown=(event)=> {
    if(event.keyCode === 13){
        let key = this.filterKeys&&this.filterKeys.length>0?this.filterKeys[0]:null;
        if(key){
            this.handleOk({ name:'',code:'',id:key });
        }
    }
  }
onSelect=(selectedKeys, info)=> {
    this.handleOk({ name:info.node.props.title,code:info.node.props.code,id:info.node.props.id });
}
    onExpand=(expandedKeys)=> {
        this.filterKeys = undefined;
        // console.log('onExpand', arguments);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded chilren keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }
    filterTreeNode=(treeNode) =>{
        // 根据 key 进行搜索，可以根据其他数据，如 value
        return this.filterFn(treeNode.props.title);
    }
    filterFn=(key)=> {
        if (this.state.inputValue && key.indexOf(this.state.inputValue) > -1) {
            return true;
        }
        return false;
    }
  render() {
      const loop = data => {
          return data.map((item) => {
              if (this.filterKeys && this.filterFn(item.name)) {
                  this.filterKeys.push(item.id);
              }
              if (item.children) {
                  return <TreeNode key={item.id} title={item.name} code={item.code} id={item.id}>{loop(item.children)}</TreeNode>;
              }
              return <TreeNode key={item.id} title={item.name} code={item.code} id={item.id}/>;
          });
      };
      let expandedKeys = this.state.expandedKeys;
      let autoExpandParent = this.state.autoExpandParent;
      if (this.filterKeys) {
          expandedKeys = this.filterKeys;
          autoExpandParent = true;
      }
      const treeNodes = loop(this.props.accBooks);

      return (
        <div className="input-accbook" onMouseLeave={this.handleClickOutside}>
            <div className="row">
                <div className="search">
                    <input placeholder="请筛选" className="form-control" value={this.state.inputValue} onChange={this.onChange} onKeyDown={this.onKeyDown} />
                </div>
                <Tree
                    className={this.filterKeys && this.filterKeys.length > 0 ? ('myCls filtertree ') : ('myCls')}
                    selectedKeys={[this.props.default]}
                    multiple={false}
                    showLine
                    showIcon={false}
                    onExpand={this.onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onSelect={this.onSelect} filterTreeNode={this.filterTreeNode}
                >
                    {treeNodes}
                </Tree>

            </div>
        </div>
    );
  }
}

export default OnClickOutside(RefAccBook);
