import * as React from 'react'
import {Action} from "redux";
import {addFile, ProjectState} from "./Modules";

export class ProjectActionDispatcher {
  constructor(private dispatch: (action: Action) => void) {}
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
    return (
        <section className="c-project">
          <div className="c-project__head">
            <h1>Project</h1>
          </div>
        </section>
    )
  }
}

