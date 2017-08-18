import * as React from 'react'
import {createNode, TreeState} from "./Modules";
import {AppAction} from "../../Store";
import NinComponent, {NinComponentInitializer} from "../../Entities/NinComponent";


export class TreeActionDispatcher {
  constructor(private dispatch: (action: AppAction) => void) {}
  createNode(initializer: NinComponentInitializer, target: NinComponent) {
    this.dispatch(createNode(initializer, target))
  }
}


interface Props {
  value: TreeState
  actions: TreeActionDispatcher
}

export default class Tree extends React.Component<Props, {}> {
  handleDrop(e: React.DragEvent<any>) {
    console.log(e.target);
    this.props.actions.createNode(JSON.parse(e.dataTransfer.getData("data")), e.target as any)
  }
  render() {
    const nodes = this.props.value.node.map( (v, i) => { return (<div key={i}>{v!!.fullName()}</div>)});
    return (
        <section className="c-tree">
          <div className="c-tree--head">
            <h1>Tree</h1>
          </div>
          <div
              onDragOver={ e=> e.preventDefault() }
              onDrop={ e => this.handleDrop(e) } className="c-tree--main" data-treeId="root">
            {nodes}
          </div>
        </section>
    )
  }
}