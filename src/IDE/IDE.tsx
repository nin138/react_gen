import * as React from "react";
import Palette from "./Palette/Palette";
import Edit from "./Edit/Edit";
import Tree from "./Tree/Tree";
import {GeneralState} from "../Store";
import {ActionDispatcher} from "./Container";

interface Props extends GeneralState{
  actions: ActionDispatcher
}

export default class IDE extends React.Component<Props, {}> {
  render() {
    console.log(this.props);
    return (
        <div>
          <Palette actions={this.props.actions.palette} value={this.props.palette} />
          <Tree actions={this.props.actions.tree} value={this.props.tree}/>
          <Edit actions={this.props.actions.edit} value={this.props.edit}/>
        </div>
    )
  }
}