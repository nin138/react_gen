import * as React from 'react'
import {NinComponent} from "../../../Entities/NinComponent";
import {TreeItemPosition} from "../Modules";
import {Map} from "immutable";

interface Props {
  nodes: Map<string, NinComponent>
  node: NinComponent
}

export default class TreeItem extends React.Component<Props> {
  render() {
    const childItems: any = this.props.node.children.map(v =>  <TreeItem key={this.props.nodes.get(v!!).id} nodes={this.props.nodes} node={this.props.nodes.get(v!!)}/>);
    return (
        <div className="c-tree--main--item">
          <div className="c-tree--main--item--before" data-treeId={this.props.node.id} data-treePosition={TreeItemPosition.before}></div>
          <div className="c-tree--main--item--body" data-treeId={this.props.node.id} data-treePosition={TreeItemPosition.body}>
            {this.props.node.fullName()}
            {childItems}
          </div>
          <div className="c-tree--main--item--after" data-treeId={this.props.node.id} data-treePosition={TreeItemPosition.after}></div>
        </div>)
  }
}