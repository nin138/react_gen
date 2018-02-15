import * as React from "react";
import {fileManager} from "../../files/FileManager";
import {Project} from "../IDE/Project/Modules";
import {Link} from "react-router-dom";
import * as path from "path";
import {Transpiler} from "../../transpiler/transpiler";
import {execCommand, serverManager} from "../../commandline/cli";

interface Props {
  project: Project
}

export default class MenuBar extends React.Component<Props, {}> {
  componentWillUnmount() {
    serverManager.disconnect();
  }
  render() {
    const onStdout = (str: string) => {
      console.log("stdout::" + str);
    };
    const onStderr = (str: string) => {
      console.log("stderr::" + str);
    };
    return (
        <section className="c-menu-bar">
          <div className="c-menu-bar__main">
            <Link className="c-menu-bar__main__item" to={"./"}>home</Link>
            <p className="c-menu-bar__main__item" onClick={() => fileManager.saveProject(this.props.project)}>save project</p>
            <p className="c-menu-bar__main__item" onClick={() => {
              fileManager.saveProject(this.props.project);
              const data = fileManager.loadProject(this.props.project.projectName);
              new Transpiler().transpile(data.index, data.files, `${path.join(fileManager.PROJECT_DIR, this.props.project.projectName, "ts")}`)
                  // .catch(e => console.log(e));
            }}>transpile</p>
            <p className="c-menu-bar__main__item" onClick={async e => {
              await execCommand("npm", ["i"],
                  path.join(fileManager.PROJECT_DIR, this.props.project.projectName, "ts"),
                  onStdout, onStderr)
              .then(_ => {
                return execCommand("npm", ["run", "build"], path.join(fileManager.PROJECT_DIR, this.props.project.projectName, "ts"), onStdout, onStderr)
              });
            }}>build</p>
            <p className="c-menu-bar__main__item" onClick={e => {
              serverManager.connect(path.join(fileManager.PROJECT_DIR, this.props.project.projectName, "ts"));
            }}>
              {"open in browser"}
            </p>
          </div>
        </section>
    )
  }
}