import * as React from "react";
import {TreeDropEventType} from "../Tree/Tree";
import {Project} from "../Project/Project";
import {HTML_TAGS} from "../../Html/Tags";
import {PaletteItem} from "./PaletteItem";

interface Props {
  project: Project
}

enum PaletteTab {
  HTML = "HTML", Components = "Components"
}

interface State {
  search: string
  tab: PaletteTab
}


export default class Palette extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {search: "", tab: PaletteTab.HTML};
  }
  onDragStart(e: React.DragEvent<any>, v: string) {
    e.dataTransfer.setData("type", TreeDropEventType.create);
    e.dataTransfer.setData("data", JSON.stringify(this.props.project.getComponentInfo(v)));
  }
  render() {
    const tabs = (
      <div className="c-palette__tab">
        {Array.from(new Set(Object.keys(PaletteTab))).map((it: any) =>
          <div className={`c-palette__tab__item${(PaletteTab[this.state.tab] == it)? " c-palette__tab__item--selected" : ""}`}
               onClick={() => {this.setState({ tab: it })}}>{it}</div>)}
      </div>
    );
    //todo refactor
    let list: Array<string>;
    switch(this.state.tab) {
      case PaletteTab.HTML:
        list = HTML_TAGS.map(it => `${it.path}.${it.type}`);
        break;
      case PaletteTab.Components:
        list = this.props.project.files.toArray().map(it => it.fullName()).filter(it => it !== ".App");
        break;
      default:
        list = [];
    }
    const components = list.filter(it => it.toLowerCase().includes(this.state.search.toLowerCase()))//to do sort
      .map(it => <PaletteItem node={{fullName: it}} />);
    return (
        <section className="c-palette">
          <div className="c-palette__head">
            <h1>Palette</h1>
            <input className="c-palette__head__input"
                   type="text"
                   value={this.state.search}
                   onChange={e => {this.setState({search: e.target.value})}}/>
          </div>
          {tabs}
          <div className="c-palette__list">
            {components}
          </div>
        </section>
    )
  }
}