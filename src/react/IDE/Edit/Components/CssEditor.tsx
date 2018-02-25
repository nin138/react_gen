import * as React from 'react'
import ClassCreator from "./ClassCreator";
import {NinElement} from "../../../Entities/NinComponent";
import {ActionDispatcher} from "../../Container";
import CssClassEditor from "./CssClassEditor";
import {CssClassManager} from "../../../Css/CssClassManager";
import {Project} from "../../Project/Project";

interface Props {
  project: Project
  component: NinElement
  actions: ActionDispatcher
  cssClassManager: CssClassManager
}

export default class CssEditor extends React.Component<Props> {

  createAndAddClass(name: string) {
    this.props.actions.project.createCssClass(name);
    this.props.actions.addCssClassToComponent(this.props.component.id, name);
  }
  createClassEditors() {
    return this.props.component.classList
      .map(v => {
        return (<CssClassEditor key={v!!}
                                className={v!!}
                                css={this.props.cssClassManager.getCss(v!!)!!}
                                removeClass={ (className: string) => this.props.actions.removeCssFromComponent(this.props.component.id, className) }
                                changeCss={ (className: string, attr: string, value: string) => this.props.actions.project.changeCssValue(className, attr, value) }/>)
      });
  }
  render() {
    const initializer = this.props.project.getComponentInitializer(this.props.component.fullName());
    return (
        <div>
          {(initializer.hasCss) ? (<ClassCreator createCssClass={ (value: string) => this.createAndAddClass(value) }/>) : ""}
          {(initializer.hasCss) ? this.createClassEditors() : ""}
        </div>)
  }
}