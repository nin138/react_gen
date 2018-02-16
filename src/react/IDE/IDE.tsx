import * as React from "react";
import Palette from "./Palette/Palette";
import Edit from "./Edit/Edit";
import Tree from "./Tree/Tree";
import {AppState} from "../Store";
import {ActionDispatcher} from "./Container";
import Log from "./Log/Log";
import Renderer from "./Renderer/Renderer";
import Project from "./Project/Project";
import MenuBar from "../MenuBar/MenuBar";

interface Props extends AppState {
  actions: ActionDispatcher
}

export default class IDE extends React.Component<Props, {}> {
  render() {
    if(!this.props.project.projectName) return <p>error::opennullproject</p>;//todo
    return (
        <section className="c-IDE">
          <MenuBar project={this.props.project} cssClassManage={this.props.ide.cssClassManager}/>
          <div className="c-IDE__body">
            <div className="c-IDE__body__project-area">
              <Project value={this.props.project} actions={this.props.actions.project}/>
            </div>
            <div className="c-IDE__body__tree-area">
              <Palette actions={this.props.actions.palette} project={this.props.project} value={this.props.palette} />
              <Tree actions={this.props.actions} value={this.props.tree} nodes={this.props.project.getActiveFile().elements} log={this.props.actions.log}/>
            </div>
            <div className="c-IDE__body__display-area">
              <Renderer cssClassManager={this.props.ide.cssClassManager} project={this.props.project} nodes={this.props.project.getActiveFile().elements} files={this.props.project.files}/>
            </div>
            <div className="c-IDE__body__edit-area">
              <Edit file={this.props.project.getActiveFile()} actions={this.props.actions} nodes={this.props.project.getActiveFile().elements} selectedItemId={this.props.tree.selectedItemId} cssClassManager={this.props.ide.cssClassManager} selectedTab={this.props.edit.selectedTab}/>
            </div>
          </div>
          <div className="c-IDE__under">
            <Log actions={this.props.actions.log} value={this.props.log} />
          </div>
        </section>
    )
  }
}