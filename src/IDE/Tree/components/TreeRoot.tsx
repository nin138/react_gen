import * as React from 'react'
import {NinComponent} from "../../../Entities/NinComponent";
import {Map} from "immutable";
import TreeItem from "./TreeItem";
import {TreeActionDispatcher} from "../Tree";

interface Props {
  nodes: Map<string, NinComponent>
  selectedItemId: string
  actions: TreeActionDispatcher
}

export default class TreeRoot extends React.Component<Props> {
  onClick() {
    this.props.actions.changeSelectedItem("root")
  }
  private onDragEnter(e: React.DragEvent<HTMLElement>) {
    e.currentTarget.style.border = "dotted";
  }
  private onDragLeave(e: React.DragEvent<HTMLElement>) {
    e.currentTarget.style.border = "none";
  }

  render() {
    const childItems: any = this.props.nodes.get("root").children.map(
        v =>  <TreeItem
            actions={this.props.actions}
            key={this.props.nodes.get(v!!).id}
            nodes={this.props.nodes}
            node={this.props.nodes.get(v!!)}
            selectedItemId={this.props.selectedItemId}/>);
    return (
        <div className="c-tree-root"
             data-treeId="root"
             onClick={ () => this.onClick() }
             onDragEnter={ e => this.onDragEnter(e) }
             onDragLeave={ e => this.onDragLeave(e) }
             onDrop={ e => this.onDragLeave(e) }>
          {childItems}
        </div>
    )
  }
}