import * as React from "react";
import {TAGS} from "../../Html/Tags";
import {itemDropped, PaletteState} from "./Modules";
import {GeneralAction} from "../../Store";
import {ActionDispatcher} from "../Container";

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
    const tags = TAGS.map(v => { return (
        <div onDragEnd={e => { console.log(e.nativeEvent);this.props.actions.itemDropped(v, e.target.toString())} }
             draggable={true}
             data-tagId={v}
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