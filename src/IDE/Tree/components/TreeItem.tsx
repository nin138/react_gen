import * as React from 'react'
import {NinComponent} from "../../../Entities/NinComponent";
import {TreeItemPosition} from "../Modules";
import {Map} from "immutable";
import {TreeActionDispatcher, TreeDropEventType} from "../Tree";

interface Props {
  nodes: Map<string, NinComponent>
  node: NinComponent
  selectedItemId: string
  actions: TreeActionDispatcher
}

export default class TreeItem extends React.Component<Props> {
  onClick(e: React.MouseEvent<any>) {
    e.stopPropagation();
    this.props.actions.changeSelectedItem(this.props.node.id);

  }
  onDragStart(e: React.DragEvent<any>) {
    e.dataTransfer.setData("type", TreeDropEventType.move);
    e.dataTransfer.setData("id", this.props.node.id)
  }
  handleDragEnterBody(e: React.DragEvent<HTMLElement>) {
    e.currentTarget.style.border = "dotted";
  }
  handleDragLeaveBody(e: React.DragEvent<HTMLElement>) {
    e.currentTarget.style.border = "none";
  }
  handleDragEnterBA(e: React.DragEvent<HTMLElement>) {
    e.currentTarget.style.opacity = "1";
  }
   handleDragLeaveBA(e: React.DragEvent<HTMLElement>) {
    e.currentTarget.style.opacity = "0";
  }

  render() {
    const childItems: any = this.props.node.children.map(
        v =>  <TreeItem key={this.props.nodes.get(v!!).id}
                        actions={this.props.actions}
                        nodes={this.props.nodes}
                        node={this.props.nodes.get(v!!)}
                        selectedItemId={this.props.selectedItemId}
        />);
    return (
        <div className="c-tree-item">
          <div className="c-tree-item__before"
               onDragEnter={ e => this.handleDragEnterBA(e)}
               onDragLeave={ e => this.handleDragLeaveBA(e)}
               onDrop={e => this.handleDragLeaveBA(e)}
               data-treeId={this.props.node.id}
               data-treePosition={TreeItemPosition.before}> </div>
          <div className={`c-tree-item__body${(this.props.selectedItemId === this.props.node.id)? " c-tree-item__body--selected" : ""}`}
               draggable={true}
               onClick={ e => this.onClick(e) }
               onDragStart={ e => this.onDragStart(e) }
               data-treeId={this.props.node.id}
               onDragEnter={ e => this.handleDragEnterBody(e)}
               onDragLeave={ e => this.handleDragLeaveBody(e)}
               onDrop={ e => this.handleDragLeaveBody(e)}
               data-treePosition={TreeItemPosition.body}>
            {/*{this.props.node.fullName()}*/}
            {this.props.node.id}
          </div>
          {childItems}
          <div className="c-tree-item__after"
               onDragEnter={ e => this.handleDragEnterBA(e)}
               onDragLeave={ e => this.handleDragLeaveBA(e)}
               onDrop={ e => this.handleDragLeaveBA(e)}
               data-treeId={this.props.node.id}
               data-treePosition={TreeItemPosition.after}> </div>
        </div>)
  }
}