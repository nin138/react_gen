import * as React from 'react'
import {changeCssAttr, EditTabs} from "./Modules";
import {AppAction} from "../../Store";
import {TreeState} from "../Tree/Modules";
import CssEditor from "./Components/CssEditor";
import {CssClassManager} from "../../Css/CssClassManager";
import {Message} from "../../Message";
import ClassCreator from "./Components/ClassCreator";
import {ActionDispatcher} from "../Container";
import {NinComponent} from "../../Entities/NinComponent";
import {EditableContent} from "../../Entities/Editable";

export class EditActionDispatcher {
  constructor(private dispatch: (action: AppAction) => void) {}
  changeCss(attr: string, value: string) {
    this.dispatch(changeCssAttr(attr, value))
  }
}

interface Props {
  value: TreeState
  cssClassManager: CssClassManager
  actions: ActionDispatcher
  selectedTab: EditTabs
}

const createEditInput = (content: EditableContent) => {
  return (
      <div>
        <p>{content.name}</p>
      </div>
  )
};

export default class Edit extends React.Component<Props, {}> {
  getBody() {
    const component = this.getActiveNode();
    switch(this.props.selectedTab) {
      case EditTabs.CSS:
        const classes = (component.editable.hasCss) ? component.editable.classList!!.map(
            v => { return (<CssEditor key={v!!} className={v!!} css={this.props.cssClassManager.getCss(v!!)!!}/>) })
            : (<p>{Message.err.dom.unableToSetCss}</p>);
        const createAndAddClass = (name: string) => {
          this.props.actions.createCssClass(name);
          this.props.actions.addCssClassToComponent(component.id, name)
        };
        return (
            <div>
              {(component.editable.hasCss) ? (<ClassCreator createCssClass={createAndAddClass}/>) : ""}
              {classes}
            </div>);
      case EditTabs.Custom:
        return component.editable.custom.toArray().map(v => createEditInput(v));

    }
  }
  getActiveNode(): NinComponent { return this.props.value.node.get(this.props.value.selectedItemId) }
  render() {
    const tabs = this.getActiveNode().editable.custom.toArray().map(v => { return(<li>{v.name}</li>) });
    const body = this.getBody();
    return (
        <section className="c-edit">
          <h1>edit</h1>
          <ul className="c-edit__tab-area">
            {(this.getActiveNode().editable.hasCss)? <li>CSS</li> : ""}
            {tabs}
          </ul>
          {body}
        </section>
    )
  }

}