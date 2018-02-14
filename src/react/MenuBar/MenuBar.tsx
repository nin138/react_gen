import * as React from "react";
import {fileManager} from "../../files/FileManager";
import {Project} from "../IDE/Project/Modules";
import {Link} from "react-router-dom";

interface Props {
  project: Project
}

export default class MenuBar extends React.Component<Props, {}> {
  render() {
    return (
        <section className="c-menu-bar">
          <div className="c-menu-bar__main">
            <Link className="c-menu-bar__main__item" to={"./"}>home</Link>
            <p className="c-menu-bar__main__item" onClick={() => fileManager.saveProject(this.props.project)}>save project</p>
          </div>
        </section>
    )
  }
}