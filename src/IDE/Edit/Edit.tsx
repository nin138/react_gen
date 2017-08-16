import * as React from 'react'
import {ActionDispatcher} from './Container'
import {EditState} from "./Modules";
import Palette from "../Palette/Palette";

interface Props {
  value: EditState
  actions: ActionDispatcher
}

export default class Edit extends React.Component<Props, {}> {
  render() {
    console.log(this.props);
    return (
        <section>
          <Palette/>
          <h1>edit</h1>
          <p>{this.props.value.attr}</p>
          <p>{this.props.value.value}</p>
          <button onClick={() => this.props.actions.changeCss("att", "cc")}>b</button>
        </section>
    )
  }
}