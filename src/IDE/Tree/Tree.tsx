import * as React from 'react'
import {createNode, createRoot, TreeState} from "./Modules";
import {AppAction} from "../../Store";
import { NinComponent, NinComponentInitializer} from "../../Entities/NinComponent";


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
  getChildNodeDom(node: NinComponent): any {
    // return React.createElement("div", {"className": node.id}, node.children.map(v => this.getChildNode(v!!)))
    const children = node.children.map(v => { return this.getChildNodeDom(this.props.value.node.get(v!!)) });
    return  <div className="c-tree--main--item"
                 key={node.id}
                 data-treeId={node.id}>
      {node.fullName()}
      {children}
      </div>
  }
  render() {
    const rootNode = this.props.value.node.get(this.props.value.rootNodeId || "");
    const root = (rootNode)?
        (<div className="c-tree--main--root" data-treeId={rootNode.id}>
          {rootNode.fullName()}
          {rootNode.children.map(v => this.getChildNodeDom(this.props.value.node.get(v!!))).toArray()}
          </div>)
        : "";
    // const nodes = this.props.value.node.map( (v, i) => { return (<div key={i}>{v!!.fullName()}</div>)});
    return (
        <section className="c-tree">
          <div className="c-tree--head">
            <h1>Tree</h1>
          </div>
          <div onDragOver={ e=> e.preventDefault() }
               onDrop={ e => this.handleDrop(e) } className="c-tree--main" data-treeId="root">
            {root}
          </div>
        </section>
    )
  }
}