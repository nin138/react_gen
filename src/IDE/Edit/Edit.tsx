import * as React from 'react'
import {changeCssAttr} from "./Modules";
import {AppAction} from "../../Store";
import {TreeState} from "../Tree/Modules";
import CssEditor from "./Components/CssEditor";
import {CssClassManager} from "../../Css/CssClassManager";
import {Message} from "../../Message";
import ClassCreator from "./Components/ClassCreator";
import {ActionDispatcher} from "../Container";

export class EditActionDispatcher {
  constructor(private dispatch: (action: AppAction) => void) {}
  changeCss(attr: string, value: string) {
    this.dispatch(changeCssAttr(attr, value))
  }
  createCssClass(name: string) {
    //todo
  }
  addCssClassToComponent(componentId: string, className: string) {
    //todo
  }
}

interface Props {
  value: TreeState
  cssClassManager: CssClassManager
  actions: ActionDispatcher
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
    // switch(this.state.selectedTab) {
    //   case EditTab.CSS: {
    //    if(component.editable.hasCss) {
    //    }
    //   }
    // }
    console.log(component);
    const classes = (component.editable.hasCss) ? component.editable.classList!!.map(
        v => { return(<CssEditor key={v!!} className={v!!} css={this.props.cssClassManager.getCss(v!!)!!}/>)})
        : (<p>{Message.err.dom.unableToSetCss}</p>);
    const createAndAddClass = (name: string) => {
      this.props.actions.createCssClass(name);
      this.props.actions.addCssClassToComponent(component.id, name)
    };
    return(
        <div>
          {(component.editable.hasCss)? (<ClassCreator createCssClass={createAndAddClass}/>) : ""}
          {classes}
        </div>)
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
        </section>
    )
  }
}