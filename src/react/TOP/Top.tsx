import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { fileManager } from "../../files/FileManager";
import { ActionDispatcher } from "../IDE/Container";
import { ModalEvent, ModalInputType } from "../Modal/Modal";
import { AppState } from "../Store";

interface Props extends AppState, RouteComponentProps<string> {
  actions: ActionDispatcher;
  location: any;
}

class Top extends React.Component<Props, {}> {
  render() {
    const projects = fileManager.getProjectNames().map(it => (
      <Link to={`/ide/${it}`}>
        <p className="c-top__prj-area__item">{it}</p>
      </Link>
    ));
    return (
      <section className="c-top">
        <h1 className="c-top__h1">Ninit</h1>
        <p
          className="c-top__create-prj"
          onClick={() => {
            this.props.actions.modal.open(
              "Start a new project",
              "",
              [
                {
                  name: "create",
                  listener: (ev: ModalEvent) => {
                    fileManager.createNewProject(ev.projectName, ev.groupName);
                    this.props.history.push(`/ide/${ev.projectName}`);
                  }
                }
              ],
              [
                { name: "projectName", type: ModalInputType.TextBox },
                { name: "groupName", type: ModalInputType.TextBox }
              ]
            );
          }}
        >
          Start a new project
        </p>
        <div className="c-top__prj-area">
          <p className="c-top__prj-area__title">Load a project</p>
          {projects}
        </div>
      </section>
    );
  }
}

export default withRouter(Top);
