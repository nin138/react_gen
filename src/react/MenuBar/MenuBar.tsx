import * as React from "react";
import {fileManager} from "../../files/FileManager";
import {Project} from "../IDE/Project/Project";
import {Link} from "react-router-dom";
import * as path from "path";
import {Transpiler} from "../../transpiler/transpiler";
import {execCommand, serverManager} from "../../commandline/cli";
import {CssClassManager} from "../Css/CssClassManager";
import {LogActionDispatcher} from "../IDE/Log/Log";

interface Props {
  log: LogActionDispatcher
  project: Project
  cssClassManage: CssClassManager
}

export default class MenuBar extends React.Component<Props, {}> {
  componentWillUnmount() {
    serverManager.disconnect();
  }
  render() {
    const onStdout = (str: string) => {
      console.log("stdout::" + str);
      this.props.log.info(str);
    };
    const onStderr = (str: string) => {
      console.log("stderr::" + str);
      this.props.log.warning(str);
    };
    return (
        <section className="c-menu-bar">
          <div className="c-menu-bar__main">
            <Link className="c-menu-bar__main__item" to={"./"}>home</Link>
            <p className="c-menu-bar__main__item" onClick={() => fileManager.saveProject(this.props.project, this.props.cssClassManage)}>save project</p>
            <p className="c-menu-bar__main__item" onClick={async () => {
              this.props.log.info("start transpile to ts");
              const data = fileManager.loadProject(this.props.project.projectName);
              await new Transpiler().transpile(data.index, data.files, data.css, `${path.join(fileManager.PROJECT_DIR, this.props.project.projectName, "ts")}`)
                  // .catch(e => console.log(e));
              this.props.log.info("finish transpile");
            }}>transpile</p>
            <p className="c-menu-bar__main__item" onClick={async e => {
              this.props.log.info("starting build");
              await execCommand("npm", ["i"],
                  path.join(fileManager.PROJECT_DIR, this.props.project.projectName, "ts"),
                  onStdout, onStderr)
              .then(async _ => {
                await execCommand("npm", ["run", "build"], path.join(fileManager.PROJECT_DIR, this.props.project.projectName, "ts"), onStdout, onStderr)
                this.props.log.info("finish build");
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