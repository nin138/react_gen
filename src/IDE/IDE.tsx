import * as React from "react";
import Palette from "./Palette/Container";
import Edit from "./Edit/Container";
import Tree from "./Tree/Container";

interface Props {

}

export default class IDE extends React.Component<Props, {}> {
  render() {
    return (
        <div>
          <Palette/>
          <Tree/>
          <Edit/>
        </div>
    )
  }
}