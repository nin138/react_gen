import * as React from 'react'
import {createNode, createRoot, TreeState} from "./Modules";
import {AppAction} from "../../Store";
import { NinComponent, NinComponentInitializer} from "../../Entities/NinComponent";
import TreeItem from "./components/TreeItem";


export class TreeActionDispatcher {
  constructor(private dispatch: (action: AppAction) => void) {}
  createNode(initializer: NinComponentInitializer, parent: string) {
    this.dispatch(createNode(new NinComponent(initializer, parent), parent))
  }
  createRoot(initializer: NinComponentInitializer) {
    this.dispatch(createRoot(new NinComponent(initializer, "root")))
  }
}


interface Props {
  value: TreeState
  actions: TreeActionDispatcher
}

export default class Tree extends React.Component<Props, {}> {
  handleDrop(e: React.DragEvent<any>) {
    const targetId = (e.target as any).getAttribute("data-treeId");
    const initializer = JSON.parse(e.dataTransfer.getData("data"));
    if(targetId == "root") this.props.actions.createRoot(initializer);
    else this.props.actions.createNode(initializer, targetId);
  }
  render() {
    const rootNode = this.props.value.node.get(this.props.value.rootNodeId || "");
    const tree = (rootNode)?
        (<div className="c-tree__main__root" data-treeId={rootNode.id}>
          {rootNode.fullName()}
          {rootNode.children.map(v => <TreeItem key={this.props.value.node.get(v!!).id} nodes={this.props.value.node} node={this.props.value.node.get(v!!)}/>)}
          </div>)
        : "";
    return (
        <section className="c-tree">
          <div className="c-tree__head">
            <h1>Tree</h1>
          </div>
          <div onDragOver={ e=> e.preventDefault() }
               onDrop={ e => this.handleDrop(e) } className="c-tree__main" data-treeId="root">
            {tree}
          </div>
        </section>
    )
  }
}

