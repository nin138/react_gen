import * as React from 'react'
import Css, {CssValue} from "../../../Css/Css";
import {CssValueTypes} from "../../../Css/Data";
import {CssUtil} from "../../../Css/CssUtil";

interface Props {
  className: string
  css: Css
}

export default class CssEditor extends React.Component<Props, {}> {
  render() {
    console.log("editor");
    console.log(this.props.css);
    console.log();
    const attrs = this.props.css.getAll();
    // const els = attrs.map((value, key) => { return(<CssAttr key={key!!} name={key!!} attr={value!!} />) });
    const nodes = attrs.keySeq().toArray().map(v => { return(<CssAttr key={v} attr={v} value={attrs.get(v)} />) });
    console.log(attrs);
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
}

class CssAttr extends React.Component<AttrProps, {}> {
  createInput(type: CssValueTypes) {
    switch(type) {
      case CssValueTypes.Color: {
        return(<input type="color"/>)
      }
      case CssValueTypes.Float: {
        return(<input type="number"/>)
      }
      case CssValueTypes.Int: {
        return(<input type="number"/>)
      }
      case CssValueTypes.ZeroToOne: {
        return(<input type="number"/>)
      }
      case CssValueTypes.Len: {
        return(<input type="text"/>)
      }
      case CssValueTypes.Other: {
        return(<input type="text"/>)
      }
      case CssValueTypes.Merge: {
        return ""
      }
      default: {
        console.log(type);
        throw new Error("ERROR INVALID CSS_VALUE_TYPE")
      }
    }
  }
  render() {
    const input = this.createInput(CssUtil.getAttrType(this.props.attr));
    return(
        <div>
          <p>{this.props.attr}</p>
          {input}
        </div>
    )
  }
}