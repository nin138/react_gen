import * as React from 'react'
import {addNode, TreeState} from "./Modules";
import {AppAction} from "../../Store";
import {NinComponentInitializer} from "../../Entities/NinComponent";


export class TreeActionDispatcher {
  constructor(private dispatch: (action: AppAction) => void) {}
  addNode(initializer: NinComponentInitializer, target: string = "root") {
    this.dispatch(addNode(initializer, target))
  }
}


interface Props {
  value: TreeState
  actions: TreeActionDispatcher
}

export default class Tree extends React.Component<Props, {}> {
  handleDrop(e: React.DragEvent<any>) {
    this.props.actions.addNode(JSON.parse(e.dataTransfer.getData("data")))
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