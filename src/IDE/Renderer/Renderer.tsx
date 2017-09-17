import * as React from "react";
import {NinComponent, NinComponentString} from "../../Entities/NinComponent";
import {Map} from "immutable"

interface Props {
  nodes: Map<string, NinComponent>
}

export default class Renderer extends React.Component<Props, {}> {
  renderComponent(component: NinComponent): string {
    let row = component.row;
    if(component.row.includes(NinComponentString.Children)) {
      row = row.replace(
          NinComponentString.Children, component.children.reduce((r, v) =>
              r + this.renderComponent(this.props.nodes.get(v!)!), ""))
    }
    if(component.row.includes(NinComponentString.Text)) {
      console.log(component.editable);
      row = row.replace(NinComponentString.Text, component.editable.attributes.get("text").value)
    }
    return row
  }
  render() {
    return (
        <section className="c-renderer">
          {this.renderComponent(this.props.nodes.get(NinComponent.ROOT_ID)!)}
        </section>
    )
  }
}