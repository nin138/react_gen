import * as React from 'react'
import {NinElement} from "../../../Entities/NinComponent";
import {TreeItemPosition} from "../Modules";
import {Map} from "immutable";
import {TreeDropEventType} from "../Tree";
import ContextMenu from "../../ContextMenu/ContextMenu";
import {ActionDispatcher} from "../../Container";
import {ModalInputType} from "../../../Modal/Modal";

interface Props {
  nodes: Map<string, NinElement>
  node: NinElement
  selectedItemId: string
  contextMenuId: string | null
  actions: ActionDispatcher
}

export default class TreeItem extends React.Component<Props> {
  onClick(e: React.MouseEvent<any>) {
    e.stopPropagation();
    this.props.actions.tree.changeSelectedItem(this.props.node.id);
  }
  onDragStart(e: React.DragEvent<any>) {
    e.dataTransfer.setData("type", TreeDropEventType.move);
    e.dataTransfer.setData("id", this.props.node.id);
  }
  onDragEnterToBody(e: React.DragEvent<HTMLElement>) {
    e.currentTarget.style.border = "dotted";
  }
  onDragLeaveFromBody(e: React.DragEvent<HTMLElement>) {
    e.currentTarget.style.border = "none";
  }
  onDragEnterToBA(e: React.DragEvent<HTMLElement>) {
    e.currentTarget.style.opacity = "1";
  }
  onDragLeaveFromBA(e: React.DragEvent<HTMLElement>) {
    e.currentTarget.style.opacity = "0";
  }
  onRightClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    this.props.actions.tree.openContextMenu(this.props.node.id);
  }
  createContextMenu() {
    return(
        <ContextMenu
            closeThis={this.props.actions.tree.closeContextMenu.bind(this.props.actions)}
            list={[
                {name: "componentize", listener: () => {
                  this.props.actions.modal.open(
                      "Componetize",
                      "enter a new component name",
                      [{name: "ok", listener: (event) => {
                        this.props.actions.project.componentize(this.props.node.id ,event["name"])
                      }}],
                      [{name: "name", type: ModalInputType.TextBox}]
                  );
                }}
                ]} />
    )
  }

  render() {
    const childItems: any = this.props.node.children.map(
        v =>  <TreeItem key={this.props.nodes.get(v!!).id}
                        actions={this.props.actions}
                        nodes={this.props.nodes}
                        node={this.props.nodes.get(v!!)}
                        selectedItemId={this.props.selectedItemId}
                        contextMenuId={this.props.contextMenuId}
        />);

    return (
        <div className="c-tree-item">
          <div className="c-tree-item__before"
               onClick={ e => this.onClick(e) }
               onDragEnter={ e => this.onDragEnterToBA(e) }
               onDragLeave={ e => this.onDragLeaveFromBA(e) }
               onDrop={e => this.onDragLeaveFromBA(e) }
               data-treeId={ this.props.node.id }
               data-treePosition={TreeItemPosition.before}> </div>
          <div className={ `c-tree-item__body${(this.props.selectedItemId === this.props.node.id)? " c-tree-item__body--selected" : ""}` }
               draggable={ true }
               onClick={ e => this.onClick(e) }
               onDragStart={ e => this.onDragStart(e) }
               data-treeId={ this.props.node.id }
               onDragEnter={ e => this.onDragEnterToBody(e) }
               onDragLeave={ e => this.onDragLeaveFromBody(e) }
               onDrop={ e => this.onDragLeaveFromBody(e) }
               onContextMenu={ e => this.onRightClick(e) }
               data-treePosition={TreeItemPosition.body}>
            {`${this.props.node.type}(${this.props.node.path})`}
          </div>
          {(this.props.node.id === this.props.contextMenuId)? this.createContextMenu() : ""}
          { childItems }
          <div className="c-tree-item__after"
               onClick={ e => this.onClick(e) }
               onDragEnter={ e => this.onDragEnterToBA(e) }
               onDragLeave={ e => this.onDragLeaveFromBA(e) }
               onDrop={ e => this.onDragLeaveFromBA(e) }
               data-treeId={ this.props.node.id }
               data-treePosition={TreeItemPosition.after }> </div>
        </div>)
  }
}