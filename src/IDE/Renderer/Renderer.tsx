import * as React from "react";
import {NinElement, NinComponentString, ROOT_ID} from "../../Entities/NinComponent";
import {Map} from "immutable"
import {Util} from "../../Util";

interface Props {
  nodes: Map<string, NinElement>
}

export default class Renderer extends React.Component<Props, {}> {
  renderComponent(component: NinElement): string {
    let row = component.row;
    if(component.editable.hasCss && !component.editable.classList!!.isEmpty()) {
      const classes = component.editable.classList!!.reduce((reduction, value) => `${reduction} ${value}`, "").substring(1);
      row = row.replace(NinComponentString.ClassName, ` class=\"${classes}\"`);
    } else row = row.replace(NinComponentString.ClassName, "");
    if(component.row.includes(NinComponentString.Children)) {
      row = row.replace(
          NinComponentString.Children, component.children.reduce((r, v) =>
              r + this.renderComponent(this.props.nodes.get(v!)!), ""))
    }
    if(component.row.includes(NinComponentString.Text)) {
      row = row.replace(NinComponentString.Text, Util.escapeHTMLString(component.editable.attributes.get("text").value))
    }
    return row
  }
  render() {
    return (
        <iframe className="c-renderer__iframe" src={'data:text/html;base64,' + btoa(this.props.nodes.get(ROOT_ID).getHTMLString(this.props.nodes))}>
          {/*<section className="c-renderer" dangerouslySetInnerHTML={{__html: this.renderComponent(this.props.nodes.get(NinElement.ROOT_ID)!)}}>*/}
          {/*</section>*/}
        </iframe>
    )
  }
}