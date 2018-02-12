import * as React from "react";
import {itemDropped, PaletteState} from "./Modules";
import {AppAction} from "../../Store";
import {TreeDropEventType} from "../Tree/Tree";
import {Project} from "../Project/Modules";

export class PaletteActionDispatcher {
  constructor(private dispatch: (action: AppAction) => void) {}
  test() {this.dispatch(itemDropped(""))}
}

interface Props {
  project: Project
  value: PaletteState
  actions: PaletteActionDispatcher
}

interface State {
  search: string
}

export default class Palette extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {search: ""};
  }
  onDragStart(e: React.DragEvent<any>, v: string) {
    e.dataTransfer.setData("type", TreeDropEventType.create);
    e.dataTransfer.setData("data", JSON.stringify(this.props.project.componentManager.getInitializer(v)));
  }
  render() {
    const components = this.props.project.componentManager.getAllPath()
        .sort()
        .filter(it => it.toLowerCase().includes(this.state.search.toLowerCase()))// todo order
        .map(v => { return(
            <div className="c-palette__list__item" onDragStart={ e => this.onDragStart(e, v) }
                 draggable={true}
                 key={v}>
              {v}
              </div>)
        });
    return (
        <section className="c-palette">
          <div className="c-palette__head">
            <h1>Palette</h1>
            <input className="c-palette__head__input" type="text" value={this.state.search} onChange={e => {this.setState({search: e.target.value})}}/>
          </div>
          <div className="c-palette__list">
          {components}
          </div>
        </section>
    )
  }
}