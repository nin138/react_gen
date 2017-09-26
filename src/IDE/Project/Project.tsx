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
    return (
        <section className="c-project">
        </section>
    )
  }
}

