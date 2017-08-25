import * as React from 'react'
import {createNode, moveNode, TreeItemPosition, TreeState} from "./Modules";
import {AppAction} from "../../Store";
import { NinComponent, NinComponentInitializer} from "../../Entities/NinComponent";
import {LogActionDispatcher} from "../Log/Log";
import {Message} from "../../Message";
import TreeRoot from "./components/TreeRoot";

export class TreeActionDispatcher {
  constructor(private dispatch: (action: AppAction) => void) {}
  createNode(initializer: NinComponentInitializer, parent: string) {
    this.dispatch(createNode(new NinComponent(initializer, parent), parent))
  }
  moveNode(moveId: string, targetId: string, position: TreeItemPosition) {
    this.dispatch(moveNode(moveId, targetId, position))
  }
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
      const target = e.target as HTMLElement;
      const id = e.dataTransfer.getData("id");
      const targetId = target.getAttribute("data-treeId") as string;
      const position = target.getAttribute("data-treePosition") as TreeItemPosition;
      console.log({moveId: id, target: targetId});
      console.log(this.getParentList(targetId));
      if(this.getParentList(targetId).includes(id)) this.props.log.error(Message.err.dom.childIncludeParent);
      else this.props.actions.moveNode(id, targetId!!, position);
    }
  }
  render() {
    const testTreeView = (node: NinComponent) => {
      const thisObj: any = {};
      node.children.map(v => thisObj[v!!] = testTreeView(this.props.value.node.get(v!!)));
      return thisObj;
    };
    console.log(testTreeView(this.props.value.node.get("root")));
    console.log(this.props.value.node.map(v => v).toArray());
    return (
        <section className="c-tree">
          <div className="c-tree__head">
            <h1>Tree</h1>
          </div>
          <div onDragOver={ e=> e.preventDefault() }
               onDrop={ e => this.handleDrop(e) }
               className="c-tree__main"
               data-treeId="root">
            <TreeRoot nodes={this.props.value.node}/>
          </div>
        </section>
    )
  }
}

