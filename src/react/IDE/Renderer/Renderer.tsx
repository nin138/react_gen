import * as React from "react";
import {NinElement, NinComponentString} from "../../Entities/NinComponent";
import {Map} from "immutable"
import {Util} from "../../../Util";
import {ComponentFile, Project} from "../Project/Modules";
import {CssClassManager} from "../../Css/CssClassManager";

interface Props {
  nodes: Map<string, NinElement>
  files: Map<string, ComponentFile>
  project: Project
  cssClassManager: CssClassManager
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
    const htmlString = `<style>${this.props.cssClassManager.getCssString()}</style>` + this.props.project.getHTMLString();
    return (
        <iframe
            className="c-renderer__iframe"
            src={'data:text/html;base64,' + btoa(htmlString)}>
        </iframe>
    )
  }
}