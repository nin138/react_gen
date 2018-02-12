import * as React from 'react'
import {Action} from "redux";
import {Map} from "immutable"
import {addFile, changeActiveFile, ComponentFile, componentize, loadProject, Project} from "./Modules";
import {changeSelectedItem} from "../Tree/Modules";
import {ROOT_ID} from "../../Entities/NinComponent";

export class ProjectActionDispatcher {
  constructor(private dispatch: (action: Action) => void) {}
  loadProject(prjName: string, files: Map<string, ComponentFile>, root: string) { this.dispatch(loadProject(prjName, files, root)) }
  addFile(fullName: string) { this.dispatch(addFile(fullName)) }
  componentize(id: string, componentName: string) { this.dispatch(componentize(id, componentName)) }
  changeActiveFile(fileName: string) {
    this.dispatch(changeActiveFile(fileName));
    this.dispatch(changeSelectedItem(ROOT_ID));
  }
}


interface Props {
  value: Project;
  actions: ProjectActionDispatcher
}

export default class ProjectTree extends React.Component<Props, {}> {
  render() {
    console.log(this.props.value);
    const files = this.props.value.files.keySeq().toArray()
        .map(it => <p onClick={() => {this.props.actions.changeActiveFile(it)}} className={`c-project__list__item${(this.props.value.activeFile == it)? " c-project__list__item--selected" : ""}`} key={it}>{it}</p>);
    return (
        <section className="c-project">
          <div className="c-project__head">
            <h1>Project</h1>
          </div>
          <div className="c-project__list">
            {files}
          </div>
        </section>
    )
  }
}

