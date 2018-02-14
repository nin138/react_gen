import * as React from "react";
import {Link} from "react-router-dom";
import {fileManager} from "../../files/FileManager";
import {Project} from "../IDE/Project/Modules";

interface Props {
  project: Project
}

export default class MenuBar extends React.Component<Props, {}> {
  render() {
    return (
        <section className="c-menu-bar">
          <Link to={"./"}>home</Link>
          <p onClick={() => fileManager.saveProject(this.props.project)}>save project</p>
        </section>
    )
  }
}