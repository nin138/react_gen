import * as React from 'react'
import {changeCssAttr, EditState} from "./Modules";
import {AppAction} from "../../Store";

export class EditActionDispatcher {
  constructor(private dispatch: (action: AppAction) => void) {}
  public changeCss(attr: string, value: string) {
    this.dispatch(changeCssAttr(attr, value))
  }
}

interface Props {
  value: EditState
  actions: EditActionDispatcher
}

export default class Edit extends React.Component<Props, {}> {
  render() {
    return (
        <section className="c-edit">
          <h1>edit</h1>
          <p>{this.props.value.attr}</p>
          <p>{this.props.value.value}</p>
          <button onClick={() => this.props.actions.changeCss("att", "cc")}>b</button>
        </section>
    )
  }
}