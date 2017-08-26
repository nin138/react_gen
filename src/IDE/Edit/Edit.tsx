import * as React from 'react'
import {changeCssAttr} from "./Modules";
import {AppAction} from "../../Store";
import {TreeState} from "../Tree/Modules";

export class EditActionDispatcher {
  constructor(private dispatch: (action: AppAction) => void) {}
  public changeCss(attr: string, value: string) {
    this.dispatch(changeCssAttr(attr, value))
  }
}

interface Props {
  value: TreeState
  actions: EditActionDispatcher
}
interface State {
  selectedTab: EditTab
}

enum EditTab {
  CSS
}

export default class Edit extends React.Component<Props, State> {
  getBody() {
    const component = this.props.value.node.get(this.props.value.selectedItemId);
    switch(this.state.selectedTab) {
      case EditTab.CSS: {
       if(component.editable.hasCss) {
       }
      }
    }
  }
  render() {
    const body = this.getBody();
    return (
        <section className="c-edit">
          <h1>edit</h1>
          <ul className="c-edit__tab-area">
            <li>CSS</li>
          </ul>
          {body}
          <button onClick={() => this.props.actions.changeCss("att", "cc")}>b</button>
        </section>
    )
  }
}