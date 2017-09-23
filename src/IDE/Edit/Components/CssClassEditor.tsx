import * as React from 'react'
import Css, {CssValue} from "../../../Css/Css";
import {CssValueTypes} from "../../../Css/Data";
import {CssUtil} from "../../../Css/CssUtil";

interface Props {
  className: string
  css: Css
  changeCss: (className: string, attr: string, value: string) => void,
}

export default class CssClassEditor extends React.Component<Props> {
  render() {
    const attrs = this.props.css.getAll();
    const nodes = attrs.keySeq().toArray()
        .sort((a, b) => (CssUtil.getAttrOrder(a) < CssUtil.getAttrOrder(b))? -1 : 1)
        .map(v => {
          return(
              <CssAttr key={v}
                       attr={v}
                       value={attrs.get(v)}
                       changeCss={ (value: string) => this.props.changeCss(this.props.className, v, value)}/>)
        });

    return(
        <div>
          <p>class::{this.props.className}</p>
          {nodes}
        </div>
    )
  }
}

interface AttrProps {
  attr: string
  value: CssValue
  changeCss: (value: string) => void
}

class CssAttr extends React.Component<AttrProps> {
  createCssInput(attr: string) {
    const type = CssUtil.getAttrType(attr);
    switch(type) {
      case CssValueTypes.Color:
        return(<input value={this.props.value.value} onChange={ e => this.props.changeCss(e.target.value) } type="color"/>);
      case CssValueTypes.Float:
        return(<input value={this.props.value.value} onChange={ e => this.props.changeCss(e.target.value) } type="number"/>);
      case CssValueTypes.Int:
        return(<input value={this.props.value.value} onChange={ e => this.props.changeCss(e.target.value) } type="number"/>);
      case CssValueTypes.ZeroToOne:
        return(<input value={this.props.value.value} onChange={ e => this.props.changeCss(e.target.value) } type="number"/>);
      case CssValueTypes.Len:
        return(<input value={this.props.value.value} onChange={ e => this.props.changeCss(e.target.value) } type="text"/>);
      case CssValueTypes.Other:
        return(<input value={this.props.value.value} onChange={ e => this.props.changeCss(e.target.value) } type="text"/>);
      case CssValueTypes.Merge:
        return "";
      default:
        console.log(type);
        throw new Error("ERROR INVALID CSS_VALUE_TYPE")
    }
  }
  render() {
    const input = this.createCssInput(this.props.attr);
    return(
        <div>
          <p>{this.props.attr}</p>
          {input}
        </div>
    )
  }
}