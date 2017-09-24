import * as React from 'react'
import {changeAttribute, changeSelectedItem, createNode, moveNode, TreeItemPosition, TreeState} from "./Modules";
import {AppAction} from "../../Store";
import { NinComponent, NinComponentInitializer} from "../../Entities/NinComponent";
import {LogActionDispatcher} from "../Log/Log";
import {Message} from "../../Message";
import TreeRoot from "./components/TreeRoot";

export class TreeActionDispatcher {
  constructor(private dispatch: (action: AppAction) => void) {}
  createNode(initializer: NinComponentInitializer, parent: string) { this.dispatch(createNode(new NinComponent(initializer, parent), parent)) }
  moveNode(moveNodeId: string, parentId: string, ref: string | null) { this.dispatch(moveNode(moveNodeId, parentId, ref)) }
  changeSelectedItem(id: string) { this.dispatch(changeSelectedItem(id)) }
  changeAttribute(targetId: string ,attr: string, value: string) { this.dispatch(changeAttribute(targetId, attr, value)) }
}

export enum TreeDropEventType {
  create = "create",
  move = "move",
}

interface Props {
  value: TreeState
  actions: TreeActionDispatcher
  log: LogActionDispatcher
}

export default class Tree extends React.Component<Props, {}> {
  getParentList(id: string): Array<string> {
    const ret: Array<string> = [];
    while(id != "root") {
      id = this.props.value.node.get(id).parent;
      ret.push(id)
    }
    return ret;
  }
  handleDrop(e: React.DragEvent<HTMLElement>) {
    const type = e.dataTransfer.getData("type");
    if(type == TreeDropEventType.create) {
      const targetId = (e.target as HTMLElement).getAttribute("data-treeId");
      const initializer = JSON.parse(e.dataTransfer.getData("data"));
      this.props.actions.createNode(initializer, targetId!!);
      return
    }
    if(type == TreeDropEventType.move) {
      const nodes = this.props.value.node;
      const target = e.target as HTMLElement;
      const id = e.dataTransfer.getData("id");
      const targetId = target.getAttribute("data-treeId") as string;
      const position = target.getAttribute("data-treePosition") as TreeItemPosition;

      const parentId = (position === TreeItemPosition.body || !position)? targetId : nodes.get(targetId).parent;
      const parentNode = nodes.get(parentId);
      const ref = (position === TreeItemPosition.body || !position)? null : (position === TreeItemPosition.before)?targetId : parentNode.children.get(parentNode.children.indexOf(targetId) + 1);
      if(parentId === id || ref === id) return;
      if(this.getParentList(targetId).includes(id)) this.props.log.error(Message.err.dom.childIncludeParent);
      else if(!this.props.value.node.get(parentId).allowChild) this.props.log.error(Message.err.dom.cannotHaveChildNode);
      else this.props.actions.moveNode(id, parentId, ref);
    }
  }
  render() {
    const testTreeView = (node: NinComponent) => {
      const thisObj: any = {};
      node.children.map(v => thisObj[v!!] = testTreeView(this.props.value.node.get(v!!)));
      return thisObj;
    };
    return (
        <section className="c-tree">
          <div className="c-tree__head">
            <h1>Tree</h1>
          </div>
          <div onDragOver={ e=> e.preventDefault() }
               onDrop={ e => this.handleDrop(e) }
               className="c-tree__main"
               data-treeId="root">
            <TreeRoot actions={this.props.actions} nodes={this.props.value.node} selectedItemId={this.props.value.selectedItemId}/>
          </div>
        </section>
    )
  }
}

