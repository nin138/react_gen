import * as React from 'react'
import {changeCssAttr, changeSelectedTab, EditTabs} from "./Modules";
import {AppAction} from "../../Store";
import {TreeState} from "../Tree/Modules";
import CssEditor from "./Components/CssEditor";
import {CssClassManager} from "../../Css/CssClassManager";
import {ActionDispatcher} from "../Container";
import {NinComponent} from "../../Entities/NinComponent";
import AttributeEditor from "./Components/AttributeEditor";

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
  tree: TreeState
  cssClassManager: CssClassManager
  actions: ActionDispatcher
  selectedTab: EditTabs
}



export default class Edit extends React.Component<Props, {}> {

  private createBody() {
    const component = this.getActiveNode();
    switch(this.props.selectedTab) {
      case EditTabs.Attributes:
        return (<AttributeEditor id={component.id} editable={component.editable} changeAttribute={this.props.actions.tree.changeAttribute}/>);
      case EditTabs.CSS:
        return (<CssEditor component={component} actions={this.props.actions} cssClassManager={this.props.cssClassManager}/>);
      case EditTabs.Custom:
        return component.editable.custom.toArray().map(v => (<div>{v}</div>));
    }
  }
  private onTabClicked(tab: EditTabs) {
    this.props.actions.edit.changeSelectedTab(tab);
  }
  private getActiveNode(): NinComponent { return this.props.tree.node.get(this.props.tree.selectedItemId) }
  render() {
    document.querySelector('style')!!.innerHTML = this.props.cssClassManager.getCssString();
    console.log(this.props.cssClassManager.getCssString());
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