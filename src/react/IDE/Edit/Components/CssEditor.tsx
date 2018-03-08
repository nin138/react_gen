import * as React from 'react'
import ClassCreator from "./ClassCreator";
import {NinElement} from "../../../Entities/NinElement";
import {ActionDispatcher} from "../../Container";
import CssClassEditor from "./CssClassEditor";
import {CssClassManager} from "../../../Css/CssClassManager";
import {Project} from "../../Project/Project";

interface Props {
  project: Project
  element: NinElement
  actions: ActionDispatcher
  cssClassManager: CssClassManager
}

export default class CssEditor extends React.Component<Props> {

  createAndAddClass(name: string) {
    this.props.actions.project.createCssClass(name);
    this.props.actions.addCssClassToComponent(this.props.element.id, name);
  }
  createClassEditors() {
    return this.props.element.classList
      .map(it => {
        return (<CssClassEditor key={it!!}
                                className={it!!}
                                css={this.props.cssClassManager.getCss(it!!)!!}
                                removeClass={ (className: string) => this.props.actions.removeCssFromComponent(this.props.element.id, className) }
                                changeCss={ (className: string, attr: string, value: string) => this.props.actions.project.changeCssValue(className, attr, value) }/>)
      });
  }
  render() {
    const initializer = this.props.project.getComponentInfo(this.props.element.fullName());
    return (
        <div>
          {(initializer.hasCss) ? (<ClassCreator createCssClass={ (value: string) => this.createAndAddClass(value) }/>) : ""}
          {(initializer.hasCss) ? this.createClassEditors() : ""}
        </div>)
  }
}