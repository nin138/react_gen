import * as React from "react";
import {AppState} from "../Store";
import {Link} from "react-router-dom";
import {ComponentFile} from "../IDE/Project/Modules";
import {Map} from "immutable"
import {ActionDispatcher} from "./Container";
import {fileManager} from "../../files/FileManager";

interface Props extends AppState {
  actions: ActionDispatcher
  location: any
}

export default class Top extends React.Component<Props, {}> {
  componentWillMount() {
    const rootDir = new URLSearchParams(this.props.location.search).get("rootDir");
    console.log(rootDir);
    if(rootDir) fileManager.setRootDir(rootDir);
  }
  render() {
    const projects = fileManager.getProjectNames().map(it => <p>{it}</p>);
    return (
        <section className="c-top">
            <Link to="/ide">
              <p onClick={() => this.props.actions.loadProject("test", Map({App: new ComponentFile("App")}), "App")}>ide</p>
            </Link>
          {projects}
        </section>
    )
  }
}