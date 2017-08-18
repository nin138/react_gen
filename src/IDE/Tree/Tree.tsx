import * as React from 'react'
import {addNode, TreeState} from "./Modules";
import {GeneralAction} from "../../Store";

export class TreeActionDispatcher {
  constructor(private dispatch: (action: GeneralAction) => void) {}
  addNode(tag: string) {
    this.dispatch(addNode(tag, "2"))
  }
}


interface Props {
  value: TreeState
  actions: TreeActionDispatcher
}

export default class Tree extends React.Component<Props, {}> {
  render() {
    const nodes = this.props.value.node.map( (v, i) => { return (<div key={i}>{v!!.tag}</div>)});
    return (
        <section>
          <h1>Tree</h1>
          <div data-treeId="root">
            {nodes}
          </div>
        </section>
    )
  }
}