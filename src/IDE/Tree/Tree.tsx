import * as React from 'react'
import {ActionDispatcher} from './Container'
import {TreeState} from "./Modules";

interface Props {
  value: TreeState
  actions: ActionDispatcher
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