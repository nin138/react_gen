import * as React from "react";
import {AppState} from "../Store";
import {Link} from "react-router-dom";
import {fileManager} from "../../files/FileManager";
import {ActionDispatcher} from "../IDE/Container";
import {ModalEvent, ModalInputType} from "../Modal/Modal";

interface Props extends AppState {
  actions: ActionDispatcher
  location: any
}

export default class Top extends React.Component<Props, {}> {
  componentWillMount() {
    const rootDir = new URLSearchParams(this.props.location.search).get("rootDir");
    if(rootDir && rootDir) fileManager.setRootDir(rootDir);
  }

  render() {
    const projects = fileManager.getProjectNames()
        .map(it => <Link to="/ide"><p className="c-top__prj-area__item" onClick={() =>  {
          const prj = fileManager.loadProject(it);
          this.props.actions.loadProject(prj.index, prj.files, prj.css);
        }}>{it}</p></Link>);
    return (
        <section className="c-top">
          <h1 className="c-top__h1">Ninit</h1>
          <p className="c-top__create-prj" onClick={() => {
            this.props.actions.modal.open(
                "Start a new project",
                "",
                [{name: "create", listener: (ev: ModalEvent) => {
                  fileManager.createNewProject(ev.projectName, ev.groupName);
                  const prj = fileManager.loadProject(ev.projectName);
                  this.props.actions.loadProject(prj.index, prj.files, prj.css);
                }}],
                [{name: "projectName", type: ModalInputType.TextBox},
                  {name: "groupName", type: ModalInputType.TextBox}]
          )}}>Start a new project</p>
          <div className="c-top__prj-area">
            <p className="c-top__prj-area__title">Load a project</p>
            {projects}
          </div>
        </section>
    )
  }
}
