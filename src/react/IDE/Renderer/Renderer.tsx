import * as React from "react";
import {NinElement} from "../../Entities/NinComponent";
import {Map} from "immutable"
import {ComponentFile, Project} from "../Project/Project";
import {CssClassManager} from "../../Css/CssClassManager";

interface Props {
  nodes: Map<string, NinElement>
  files: Map<string, ComponentFile>
  project: Project
  cssClassManager: CssClassManager
}

export default class Renderer extends React.Component<Props, {}> {
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