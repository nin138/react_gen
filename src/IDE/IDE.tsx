import * as React from "react";
import Palette from "./Palette/Palette";
import Edit from "./Edit/Edit";
import Tree from "./Tree/Tree";
import {AppState} from "../Store";
import {ActionDispatcher} from "./Container";
import Log from "./Log/Log";

interface Props extends AppState {
  actions: ActionDispatcher
}

export default class IDE extends React.Component<Props, {}> {
  render() {
    return (
        <section className="c-IDE">
          <div className="c-IDE__body">
            <div className="c-IDE__body__tree-area">
              <Palette actions={this.props.actions.palette} ide={this.props.ide} value={this.props.palette} />
              <Tree actions={this.props.actions.tree} value={this.props.tree}/>
            </div>
            <div className="c-IDE__body__display-area">
              <h1>display</h1>
            </div>
            <div className="c-IDE__body__edit-area">
              <Edit actions={this.props.actions.edit} value={this.props.edit}/>
            </div>
          </div>
          <div className="c-IDE__under">
            <Log actions={this.props.actions.log} value={this.props.log} />
          </div>
        </section>
    )
  }
}