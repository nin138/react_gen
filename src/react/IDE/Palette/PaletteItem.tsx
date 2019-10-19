import * as React from "react";
import { DragSource } from "react-dnd";
import { Util } from "../../../Util";

export const PaletteDnDType = "PaletteDnDType";

const externalNodeSpec = {
  beginDrag: (componentProps: any) => ({
    node: {
      title: componentProps.node.fullName,
      id: Util.generateId(),
      fullName: componentProps.node.fullName
    }
  })
};
const externalNodeCollect = (connect: any /* , monitor */) => ({
  connectDragSource: connect.dragSource()
});

class PaletteItemBase extends React.Component<{
  connectDragSource: any;
  node: { fullName: string };
}> {
  render() {
    const { connectDragSource, node } = this.props;
    return connectDragSource(
      <div className="c-palette__list__item">{node.fullName}</div>,
      { dropEffect: "copy" }
    );
  }
}

export const PaletteItem = DragSource(
  PaletteDnDType,
  externalNodeSpec,
  externalNodeCollect
)(PaletteItemBase);
