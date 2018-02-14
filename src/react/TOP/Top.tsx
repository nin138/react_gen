import * as React from "react";
import {AppState} from "../Store";
import {Link} from "react-router-dom";
import {fileManager} from "../../files/FileManager";
import {ActionDispatcher} from "../IDE/Container";

interface Props extends AppState {
  actions: ActionDispatcher
  location: any
}

export default class Top extends React.Component<Props, {}> {
  componentWillMount() {
    const rootDir = new URLSearchParams(this.props.location.search).get("rootDir");
    if(rootDir) fileManager.setRootDir(rootDir);
  }

  render() {
    const projects = fileManager.getProjectNames()
        .map(it => <Link to="/ide"><p onClick={() =>  {
          const prj = fileManager.loadProject(it);
          console.log(prj);
          this.props.actions.loadProject(prj.index, prj.files);
        }}>{it}</p></Link>);
    return (
        <section className="c-top">
          {projects}
        </section>
    )
  }
}
