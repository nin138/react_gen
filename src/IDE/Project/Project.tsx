import * as React from 'react'
import {Action} from "redux";

export class ProjectActionDispatcher {
  constructor(private dispatch: (action: Action) => void) {}
  addFile() { this.dispatch({  } as any) }
}

export enum TreeDropEventType {
  create = "create",
  move = "move",
}

interface Props {
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

