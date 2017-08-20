import * as React from 'react'
import {NinComponent} from "../../../Entities/NinComponent";
import {TreeItemPosition} from "../Modules";
import {Map} from "immutable";

interface Props {
  nodes: Map<string, NinComponent>
  node: NinComponent
}

export default class TreeItem extends React.Component<Props> {
  private handleDragEnterBody(e: React.DragEvent<HTMLElement>) {
    e.currentTarget.style.border = "dotted";
  }
  private handleDragLeaveBody(e: React.DragEvent<HTMLElement>) {
    e.currentTarget.style.border = "none";
  }
  private handleDragEnterBA(e: React.DragEvent<HTMLElement>) {
    e.currentTarget.style.opacity = "1";
  }
  private handleDragLeaveBA(e: React.DragEvent<HTMLElement>) {
    e.currentTarget.style.opacity = "0";
  }

  render() {
    const childItems: any = this.props.node.children.map(
        v =>  <TreeItem key={this.props.nodes.get(v!!).id} nodes={this.props.nodes} node={this.props.nodes.get(v!!)}/>);
    return (
        <div className="c-tree__main__item">
          <div className="c-tree__main__item__before"
               onDragEnter={ e => this.handleDragEnterBA(e)}
               onDragLeave={ e => this.handleDragLeaveBA(e)}
               onDrop={e => this.handleDragLeaveBA(e)}
               data-treeId={this.props.node.id}
               data-treePosition={TreeItemPosition.before}> </div>
          <div className="c-tree__main__item__body"
               data-treeId={this.props.node.id}
               onDragEnter={ e => this.handleDragEnterBody(e)}
               onDragLeave={ e => this.handleDragLeaveBody(e)}
               onDrop={ e => this.handleDragLeaveBody(e)}

               data-treePosition={TreeItemPosition.body}>
            {this.props.node.fullName()}
          </div>
          {childItems}
          <div className="c-tree__main__item__after"
               onDragEnter={ e => this.handleDragEnterBA(e)}
               onDragLeave={ e => this.handleDragLeaveBA(e)}
               onDrop={ e => this.handleDragLeaveBA(e)}
               data-treeId={this.props.node.id}
               data-treePosition={TreeItemPosition.after}> </div>
        </div>)
  }
}