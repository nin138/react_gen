import * as React from 'react'
import {changeCssAttr, EditState} from "./Modules";
import {GeneralAction} from "../../Store";

export class EditActionDispatcher {
  constructor(private dispatch: (action: GeneralAction) => void) {}
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
    console.log(this.props);
    return (
        <section>
          <h1>edit</h1>
          <p>{this.props.value.attr}</p>
          <p>{this.props.value.value}</p>
          <button onClick={() => this.props.actions.changeCss("att", "cc")}>b</button>
        </section>
    )
  }
}