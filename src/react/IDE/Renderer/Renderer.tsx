import { Map } from "immutable";
import * as React from "react";
import { CssClassManager } from "../../Css/CssClassManager";
import { NinElement } from "../../Entities/NinElement";
import { ComponentFile } from "../Project/ComponentFile";
import { Project } from "../Project/Project";

interface Props {
  nodes: Map<string, NinElement>;
  files: Map<string, ComponentFile>;
  project: Project;
  cssClassManager: CssClassManager;
}

export default class Renderer extends React.Component<Props, {}> {
  iframe: HTMLIFrameElement | null;
  componentDidMount() {
    this.updateView();
  }
  componentDidUpdate() {
    this.updateView();
  }
  updateView() {
    const htmlString =
      `<style>${this.props.cssClassManager.getCssString()}</style>` +
      this.props.project.getHTMLString();
    if (this.iframe) {
      const doc = this.iframe.contentDocument;
      doc.open();
      doc.write(htmlString);
      doc.close();
    }
  }
  render() {
    return (
      <iframe
        ref={ref => {
          this.iframe = ref;
        }}
        className="c-renderer__iframe"
      />
    );
  }
}
