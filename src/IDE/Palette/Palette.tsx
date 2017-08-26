import * as React from "react";
import {itemDropped, PaletteState} from "./Modules";
import {AppAction} from "../../Store";
import {IDEState} from "../Modules";
import {TreeDropEventType} from "../Tree/Tree";

export class PaletteActionDispatcher {
  constructor(private dispatch: (action: AppAction) => void) {}
  test() {this.dispatch(itemDropped(""))}
}

interface Props {
  ide: IDEState
  value: PaletteState
  actions: PaletteActionDispatcher
}

export default class Palette extends React.Component<Props, {}> {
  onDragStart(e: React.DragEvent<any>, v: string) {
    e.dataTransfer.setData("type", TreeDropEventType.create);
    e.dataTransfer.setData("data", JSON.stringify(this.props.ide.componentManager.getInitializer(v)));
  }
  render() {
    const components = this.props.ide.componentManager.getAllPath().map(v => {
      return(
      <div onDragStart={ e => this.onDragStart(e, v) }
           draggable={true}
           key={v}>
        {v}
      </div>)
    });
    return (
        <section className="c-palette">
          <h1>Palette</h1>
          {components}
        </section>
    )
  }
}