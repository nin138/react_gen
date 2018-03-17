import * as React from 'react'
import {changeCssAttr, changeSelectedTab, EditTabs} from "./Modules";
import {AppAction} from "../../Store";
import CssEditor from "./Components/CssEditor";
import {CssClassManager} from "../../Css/CssClassManager";
import {ActionDispatcher} from "../Container";
import {NinElement, ROOT_ID} from "../../Entities/NinElement";
import AttributeEditor from "./Components/AttributeEditor";
import {Map} from "immutable";
import {Project} from "../Project/Project";
import {ComponentFile} from "../Project/ComponentFile";

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
  project: Project
  selectedItemId: string
  nodes: Map<string, NinElement>
  cssClassManager: CssClassManager
  actions: ActionDispatcher
  selectedTab: EditTabs
  file: ComponentFile
}


export default class Edit extends React.Component<Props, {}> {
  private createTab() {
    return(<React.Fragment>
    <li className={`c-edit__head__tab-area__item ${(this.props.selectedTab === EditTabs.Attributes)? "c-edit__head__tab-area__item--selected" : ""}`}
        onClick={ () => this.onTabClicked(EditTabs.Attributes) }>
      Attributes
    </li>
    {
      (this.props.selectedItemId !== ROOT_ID && this.props.project.getComponentInfo(this.getActiveElement().fullName()).hasCss === true)?
        <li className={`c-edit__head__tab-area__item ${(this.props.selectedTab === EditTabs.CSS) ? "c-edit__head__tab-area__item--selected" : ""}`}
            onClick={() => this.onTabClicked(EditTabs.CSS)}>
          CSS
        </li> : ""
    }
    </React.Fragment>)
  }
  private createBody() {
    if(this.props.selectedItemId === ROOT_ID) {
      return (<div>
        <p>file: {this.props.file.fullName()}</p>
        TODO
      </div>)
    }
    const element = this.getActiveElement();
    const initializer = this.props.project.getComponentInfo(element.fullName());
    console.log(initializer);
    const tab = (!initializer.hasCss && this.props.selectedTab === EditTabs.CSS)? EditTabs.Attributes : this.props.selectedTab;
    switch(tab) {
      case EditTabs.Attributes:
        return (<AttributeEditor project={this.props.project}
                                 element={element}
                                 changeAttribute={(id, attr, value) => this.props.actions.tree.changeAttribute(id, attr, value)}/>);
      case EditTabs.CSS:
        return (<CssEditor project={this.props.project} element={element} actions={this.props.actions} cssClassManager={this.props.cssClassManager}/>);
    }
  }
  private onTabClicked(tab: EditTabs) {
    this.props.actions.edit.changeSelectedTab(tab);
  }
  private getActiveElement(): NinElement { return this.props.nodes.get(this.props.selectedItemId) }
  render() {
    return (
        <section className="c-edit">
          <div className="c-edit__head">
            <h1>edit</h1>
            <ul className="c-edit__head__tab-area">
              {this.createTab()}
            </ul>
          </div>
          <div className="c-edit__body">
            {this.createBody()}
          </div>
        </section>
    )
  }

}