import * as React from "react";
import {NinElement} from "../../Entities/NinComponent";
import {Map} from "immutable"
import {Project} from "../Project/Project";
import {CssClassManager} from "../../Css/CssClassManager";
import {ComponentFile} from "../Project/ComponentFile";

interface Props {
  nodes: Map<string, NinElement>
  files: Map<string, ComponentFile>
  project: Project
  cssClassManager: CssClassManager
}

export default class Renderer extends React.Component<Props, {}> {
  componentDidMount() {
    this.updateView();
  }
  componentDidUpdate() {
    this.updateView();
  }
  updateView() {
    const htmlString = `<style>${this.props.cssClassManager.getCssString()}</style>` + this.props.project.getHTMLString();
    const doc = (this.refs.renderer__iframe as HTMLIFrameElement).contentDocument;
    doc.open();
    doc.write(htmlString);
    doc.close();
  }
  render() {
    return (
        <iframe ref="renderer__iframe"
            className="c-renderer__iframe">
        </iframe>
    )
  }
}