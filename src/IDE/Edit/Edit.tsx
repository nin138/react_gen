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
import {EditableContent, EditableContentType} from "../../Entities/Editable";

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
  private createAttributeInput(id: string, content: EditableContent) {
    const createInput = (value: string, type: EditableContentType, onChange: (value: string) => void, cssAttr?: string) => {
      switch(type) {
        case EditableContentType.string: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case EditableContentType.html_string: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case EditableContentType.array: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case EditableContentType.float: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case EditableContentType.int: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case EditableContentType.script: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case EditableContentType.any: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>);
        case EditableContentType.css: return (<input value={value} onChange={ (e) => onChange(e.target.value) } type="text"/>); // todo use CssEditor
      }};
    const action = (value: string)=> { this.props.actions.tree.changeAttribute(id, content.name, value) };
    return (
        <div key={content.name}>
          <p>{content.name}</p>
          {createInput(content.value, content.type, action,content.cssAttr)}
        </div>
    );
  }
  private createBody() {
    const component = this.getActiveNode();
    switch(this.props.selectedTab) {
      case EditTabs.Attributes:
        return (
            <div>
              Attrs
              {component.editable.attributes.keySeq().toArray().map(v => this.createAttributeInput(component.id ,component.editable.attributes.get(v)))}
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
        return component.editable.custom.toArray().map(v => (<div>{v}</div>));
    }
  }
  private onTabClicked(tab: EditTabs) {
    this.props.actions.edit.changeSelectedTab(tab);
  }
  private getActiveNode(): NinComponent { return this.props.tree.node.get(this.props.tree.selectedItemId) }
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