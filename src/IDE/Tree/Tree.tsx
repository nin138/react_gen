import * as React from 'react'
import {ActionDispatcher} from './Container'
import {TreeState} from "./Modules";

interface Props {
  value: TreeState
  actions: ActionDispatcher
}

export default class Tree extends React.Component<Props, {}> {
  render() {
    console.log(this.props);
    const nodes = this.props.value.node.map( v => { return (<div>{v}</div>)});
    return (
        <section>
          <h1>Tree</h1>
          {nodes}
        </section>
    )
  }
}