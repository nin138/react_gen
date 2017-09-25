import * as React from "react";
import Palette from "./Palette/Palette";
import Edit from "./Edit/Edit";
import Tree from "./Tree/Tree";
import {AppState} from "../Store";
import {ActionDispatcher} from "./Container";
import Log from "./Log/Log";
import Renderer from "./Renderer/Renderer";
import Project from "./Project/Project";

interface Props extends AppState {
  actions: ActionDispatcher
}

export default class IDE extends React.Component<Props, {}> {
  render() {
    return (
        <section className="c-IDE">
          <div className="c-IDE__body">
            <div className="c-IDE__body__project-area">
              <Project actions={this.props.actions.project}/>
            </div>
            <div className="c-IDE__body__tree-area">
              <Palette actions={this.props.actions.palette} ide={this.props.ide} value={this.props.palette} />
              <Tree actions={this.props.actions.tree} value={this.props.tree} log={this.props.actions.log}/>
            </div>
            <div className="c-IDE__body__display-area">
              <Renderer nodes={this.props.tree.node}/>
            </div>
            <div className="c-IDE__body__edit-area">
              <Edit actions={this.props.actions} tree={this.props.tree} cssClassManager={this.props.ide.cssClassManager} selectedTab={this.props.edit.selectedTab}/>
            </div>
          </div>
          <div className="c-IDE__under">
            <Log actions={this.props.actions.log} value={this.props.log} />
          </div>
        </section>
    )
  }
}