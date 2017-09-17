import * as React from 'react'
import {changeCssAttr, changeSelectedTab, EditTabs} from "./Modules";
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
  changeSelectedTab(tab: EditTabs) {
    this.dispatch(changeSelectedTab(tab));
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

  createBody() {
    const component = this.getActiveNode();
    switch(this.props.selectedTab) {
      case EditTabs.Attributes:
        return (
            <div>
              Attrs
              {component.editable.attributes.keys()}
            </div>);
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
  onTabClicked(tab: EditTabs) {
    this.props.actions.edit.changeSelectedTab(tab);
  }
  getActiveNode(): NinComponent { return this.props.value.node.get(this.props.value.selectedItemId) }
  render() {
    return (
        <section className="c-edit">
          <h1>edit</h1>
          <ul className="c-edit__tab-area">
            <li className={`c-edit__tab-area__item ${(this.props.selectedTab === EditTabs.Attributes)? "c-edit__tab-area__item--selected" : ""}`}
                onClick={ () => this.onTabClicked(EditTabs.Attributes) }>
              Attributes
            </li>
            <li className={`c-edit__tab-area__item ${(this.props.selectedTab === EditTabs.CSS)? "c-edit__tab-area__item--selected" : ""}`}
                onClick={ () => this.onTabClicked(EditTabs.CSS) }>
              CSS
            </li>
          </ul>
          {this.createBody()}
        </section>
    )
  }

}