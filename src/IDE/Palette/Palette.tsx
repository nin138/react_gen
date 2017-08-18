import * as React from "react";
import {TAGS} from "../../Html/Tags";
import {itemDropped, PaletteState} from "./Modules";
import {GeneralAction} from "../../Store";

export class PaletteActionDispatcher {
  constructor(private dispatch: (action: GeneralAction) => void) {}
  itemDropped(target: string) { console.log(target);this.dispatch(itemDropped("div")) }
}

interface Props {
  value: PaletteState
  actions: PaletteActionDispatcher
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