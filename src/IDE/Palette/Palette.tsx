import * as React from "react";
import {itemDropped, PaletteState} from "./Modules";
import {AppAction} from "../../Store";
import {IDEState} from "../Modules";

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
  render() {
    const components = this.props.ide.componentManage.getAllPath().map(v => {
      return(
      <div onDragStart={ e => { e.dataTransfer.setData("data", JSON.stringify(this.props.ide.componentManage.getInitializer(v)) ); }}
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