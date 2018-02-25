import * as React from "react";
import {TreeDropEventType} from "../Tree/Tree";
import {Project} from "../Project/Project";
import {HTML_TAGS} from "../../Html/Tags";


interface Props {
  project: Project
}

enum PaletteTab {
  html, components
}

interface State {
  search: string
  tab: PaletteTab
}

export default class Palette extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {search: "", tab: PaletteTab.html};
  }
  onDragStart(e: React.DragEvent<any>, v: string) {
    e.dataTransfer.setData("type", TreeDropEventType.create);
    e.dataTransfer.setData("data", JSON.stringify(this.props.project.getComponentInitializer(v)));
  }
  render() {
    let list: Array<string>;
    switch(this.state.tab) {
      case PaletteTab.html:
        list = HTML_TAGS.map(it => `${it.path}.${it.type}`);
        break;
      case PaletteTab.components:
        list = this.props.project.files.toArray().map(it => it.fullName());
        break;
      default:
        list = [];
    }
    const components = list.filter(it => it.toLowerCase().includes(this.state.search.toLowerCase())) // todo sort
      .map(v => (<div className="c-palette__list__item" key={v}
                       onDragStart={ e => this.onDragStart(e, v) }
                       draggable={true}>{v}</div>)
      );
    return (
        <section className="c-palette">
          <div className="c-palette__head">
            <h1>Palette</h1>
            <input className="c-palette__head__input"
                   type="text"
                   value={this.state.search}
                   onChange={e => {this.setState({search: e.target.value})}}/>
          </div>
          <div className="c-palette__list">
            {components}
          </div>
        </section>
    )
  }
}