import * as React from "react";
import {fileManager} from "../../files/FileManager";
import {Project} from "../IDE/Project/Modules";
import {Link} from "react-router-dom";
import * as path from "path";
import {Transpiler} from "../../transpiler/transpiler";

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
            {/*<p className="c-menu-bar__main__item" onClick={() => ({*/}
              {/*group: this.props.project.groupName,*/}
              {/*project: this.props.project.projectName,*/}
              {/*version: this.props.project.version,*/}
              {/*root: this.props.project.root + ".toml",*/}
              {/*indexPath: path.join(fileManager.PROJECT_DIR, this.props.project.projectName, "src"),*/}
              {/*outDir: path.join(fileManager.PROJECT_DIR, this.props.project.projectName, "out"),*/}
              {/*dependency: [],// todo*/}
            {/*})}>transpile</p>*/}
            <p className="c-menu-bar__main__item" onClick={() => {
              fileManager.saveProject(this.props.project);
              const data = fileManager.loadProject(this.props.project.projectName);
              new Transpiler().transpile(data.index, data.files, `${path.join(fileManager.PROJECT_DIR, this.props.project.projectName, "ts")}`)
                  .catch(e => console.log(e));
            }}>transpile</p>
          </div>
        </section>
    )
  }
}