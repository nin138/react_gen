import * as React from "react";
import { fileManager } from "../../files/FileManager";
import MenuBar from "../MenuBar/MenuBar";
import { AppState } from "../Store";
import { ActionDispatcher } from "./Container";
import Edit from "./Edit/Edit";
import Log from "./Log/Log";
import Palette from "./Palette/Palette";
import Project from "./Project/ProjectTree";
import Renderer from "./Renderer/Renderer";
import Tree from "./Tree/Tree";

interface Props extends AppState {
  actions: ActionDispatcher;
  match: any;
}

export default class IDE extends React.Component<Props, {}> {
  componentWillMount() {
    const projectName = this.props.match.params.id;
    if (!projectName && !this.props.project.projectName) {
      throw new Error("empty project loaded");
    }
    const prj = fileManager.loadProject(projectName);
    this.props.actions.loadProject(prj.index, prj.files, prj.css);
  }
  render() {
    if (!this.props.project.projectName) {
      return <p>error::emptyprojectloaded</p>;
    } // todo
    return (
      <section className="c-IDE">
        <MenuBar
          project={this.props.project}
          cssClassManage={this.props.project.cssManager}
          log={this.props.actions.log}
        />
        <div className="c-IDE__body">
          <div className="c-IDE__body__project-area">
            <Project
              value={this.props.project}
              actions={this.props.actions.project}
            />
          </div>
          <div className="c-IDE__body__tree-area">
            <Palette project={this.props.project} />
            <Tree
              project={this.props.project}
              actions={this.props.actions}
              value={this.props.tree}
              nodes={this.props.project.getActiveFile().elements}
              log={this.props.actions.log}
            />
          </div>
          <div className="c-IDE__body__display-area">
            <Renderer
              cssClassManager={this.props.project.cssManager}
              project={this.props.project}
              nodes={this.props.project.getActiveFile().elements}
              files={this.props.project.files}
            />
          </div>
          <div className="c-IDE__body__edit-area">
            <Edit
              project={this.props.project}
              file={this.props.project.getActiveFile()}
              actions={this.props.actions}
              nodes={this.props.project.getActiveFile().elements}
              selectedItemId={this.props.tree.selectedItemId}
              cssClassManager={this.props.project.cssManager}
              selectedTab={this.props.edit.selectedTab}
            />
          </div>
        </div>
        <div className="c-IDE__under">
          <Log actions={this.props.actions.log} value={this.props.log} />
        </div>
      </section>
    );
  }
}
