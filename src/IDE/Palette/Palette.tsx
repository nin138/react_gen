import * as React from "react";
import {itemDropped, PaletteState} from "./Modules";
import {GeneralAction} from "../../Store";
import {ActionDispatcher} from "../Container";
import {HTML_PATH, HTML_TAGS} from "../../Html/Tags";

export class PaletteActionDispatcher {
  constructor(private dispatch: (action: GeneralAction) => void, private parent: ActionDispatcher) {}
  itemDropped(tag: string, target: string) {
    this.parent.tree.addNode(tag);
  }
  test() {this.dispatch(itemDropped(""))}
}

interface Props {
  value: PaletteState
  actions: PaletteActionDispatcher
}

export default class Palette extends React.Component<Props, {}> {
  render() {
    const tags = HTML_TAGS.keySeq().toArray().map(v => { return (
        <div onDragStart={ e => { e.dataTransfer.setData("tag", `${HTML_PATH}.${v}` ); }}
             draggable={true}
             key={v}>
          {v}
        </div>) });
    return (
        <section className="c-palette">
          <h1>Palette</h1>
          {tags}
        </section>
    )
  }
}