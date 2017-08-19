import * as React from 'react'
import {createNode, createRoot, TreeState} from "./Modules";
import {AppAction} from "../../Store";
import {NinComponent, NinComponentInitializer} from "../../Entities/NinComponent";


export class TreeActionDispatcher {
  constructor(private dispatch: (action: AppAction) => void) {}
  createNode(initializer: NinComponentInitializer, target: NinComponent) {
    this.dispatch(createNode(initializer, target))
  }
  createRoot(initializer: NinComponentInitializer) {
    this.dispatch(createRoot(initializer))
  }
}


interface Props {
  value: TreeState
  actions: TreeActionDispatcher
}

export default class Tree extends React.Component<Props, {}> {
  handleDrop(e: React.DragEvent<any>) {
    const targetId = (e.target as any).getAttribute("data-treeId");
    console.log(targetId);
    const initializer = JSON.parse(e.dataTransfer.getData("data"));
    if(targetId == "root") this.props.actions.createRoot(initializer);
    else this.props.actions.createNode(initializer, this.props.value.node.find((v) => {
      return (v!!.id == targetId)
    }))
  }
  getChildNode(node: NinComponent): any {
    // return React.createElement("div", {"className": node.id}, node.children.map(v => this.getChildNode(v!!)))
    return  <div>{node.fullName()}{...(node.children.map(v => { this.getChildNode(v!!) }).toArray())}</div>
  }
  render() {
    console.log(this.props.value.rootNode);
    const root = this.props.value.rootNode;
    const rootNode = (root)?
        (<div className="c-tree--main--root" data-treeId={root.id}>
          {root.fullName()}
          {...root.children.map(v => this.getChildNode(v!!)).toArray()}
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
            {rootNode}
          </div>
        </section>
    )
  }
}