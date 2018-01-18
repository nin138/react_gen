import * as React from 'react'
import {Action} from "redux";
import {Map} from "immutable"
import {addFile, ComponentFile, loadProject, ProjectState} from "./Modules";

export class ProjectActionDispatcher {
  constructor(private dispatch: (action: Action) => void) {}
  loadProject(prjName: string, files: Map<string, ComponentFile>, root: string) { this.dispatch(loadProject(prjName, files, root)) }
  addFile(fullName: string) { this.dispatch(addFile(fullName)) }
}


interface Props {
  value: ProjectState;
  actions: ProjectActionDispatcher
}

export default class Project extends React.Component<Props, {}> {
  render() {
    // const root = [];
    // const keys = this.props.value.files.keySeq().toArray().map(v => {
    //   const arr = v.split("/");
    //   arr.forEach(v => {
    //
    //   })
    // });
    const files = this.props.value.files.keySeq().toArray()
        .map(it => <p className={`c-project__list__item${(this.props.value.activeFile == it)? " c-project__list__item--selected" : ""}`} key={it}>{it}</p>);
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

