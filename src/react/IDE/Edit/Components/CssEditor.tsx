import * as React from 'react'
import ClassCreator from "./ClassCreator";
import {NinElement} from "../../../Entities/NinComponent";
import {ActionDispatcher} from "../../Container";
import CssClassEditor from "./CssClassEditor";
import {CssClassManager} from "../../../Css/CssClassManager";
import {Message} from "../../../Message";

interface Props {
  component: NinElement
  actions: ActionDispatcher
  cssClassManager: CssClassManager
}

export default class CssEditor extends React.Component<Props> {

  createAndAddClass(name: string) {
    console.log(this);
    this.props.actions.createCssClass(name);
    this.props.actions.addCssClassToComponent(this.props.component.id, name);
  }
  createClassEditors() {
    return (this.props.component.editable.hasCss)
        ? this.props.component.editable.classList!!
            .map(v => {
              return (<CssClassEditor key={v!!}
                                      className={v!!}
                                      css={this.props.cssClassManager.getCss(v!!)!!}
                                      removeClass={ (className: string) => this.props.actions.removeCssFromComponent(this.props.component.id, className) }
                                      changeCss={ (className: string, attr: string, value: string) => this.props.actions.changeCss(className, attr, value) }/>)
            })
        : (<p>{Message.err.dom.unableToSetCss}</p>);
  }
  render() {
    return (
        <div>
          {(this.props.component.editable.hasCss) ? (<ClassCreator createCssClass={ (value: string) => this.createAndAddClass(value) }/>) : ""}
          {this.createClassEditors()}
        </div>)
  }
}