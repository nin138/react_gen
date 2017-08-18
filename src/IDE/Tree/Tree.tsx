import * as React from 'react'
import {addNode, TreeState} from "./Modules";
import {GeneralAction} from "../../Store";

export class TreeActionDispatcher {
  constructor(private dispatch: (action: GeneralAction) => void) {}
  addNode(tag: string, target: string = "root") {
    this.dispatch(addNode(tag, target))
  }
}


interface Props {
  value: TreeState
  actions: TreeActionDispatcher
}

export default class Tree extends React.Component<Props, {}> {
  handleDrop(e: React.DragEvent<any>) {
    this.props.actions.addNode(e.dataTransfer.getData("tag"))
  }
  render() {
    const nodes = this.props.value.node.map( (v, i) => { return (<div key={i}>{v!!.tag}</div>)});
    return (
        <section className="c-tree">
          <div className="c-tree--head">
            <h1 onDragEnter={() => {console.log("enter")}} onDrop={ () => {console.log("www")} }>Tree</h1>
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