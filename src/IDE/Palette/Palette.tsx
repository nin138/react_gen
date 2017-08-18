import * as React from "react";
import {TAGS} from "../../Html/Tags";
import {PaletteState} from "./Modules";
import {ActionDispatcher} from "./Container";

interface Props {
  value: PaletteState
  actions: ActionDispatcher
}

export default class Palette extends React.Component<Props, {}> {
  render() {
    const tags = TAGS.map(v => { return (<div onDragStart={() => {console.log("ssss")}} onDragEnd={e => { console.log("ond");this.props.actions.itemDropped(e.target.toString())} } draggable={true} key={v}>{v}</div>) });
    return (
        <div>
          {tags}
        </div>
    )
  }
}