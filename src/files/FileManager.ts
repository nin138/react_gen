import * as fs from "fs-extra";
import * as Path from "path";
import {Project} from "../react/IDE/Project/Modules";
import {Toml} from "../Util";
import {createComponentFile} from "./SaveProject";

class FileManager {
  private ROOT_DIR: string;
  private PROJECT_DIR: string;
  setRootDir(dir: string) {
    this.ROOT_DIR = dir;
    this.PROJECT_DIR = Path.join(this.ROOT_DIR, "projects");
  }
  makeProjectDir(prjName: string) {
    fs.mkdirsSync(Path.join(this.PROJECT_DIR, prjName));
  }
  getProjectNames(): Array<string> {
    try {
      return fs.readdirSync(this.PROJECT_DIR);
    } catch(e) {
      return [];
    }
  }
  private writeFile(path: string, fileName: string, data: string) {
    if(!fs.existsSync(path)) fs.mkdirsSync(path);
    fs.writeFileSync(Path.join(path, fileName), data);
  }
  // getProject(projectName: string): { files: Map<string, ComponentFile>, root: string } {
  //
  // }
  saveProject(project: Project) {
    this.makeProjectDir(project.projectName);
    fs.removeSync(Path.join(this.PROJECT_DIR, project.projectName, "components"));
    const createIndexToml = (prj: Project): string => {
      return Toml.stringify({
        group: prj.groupName,
        project: prj.projectName,
        version: prj.version,
        root: prj.root,
        css: "./style",// todo
        dependency: []//todo
      });
    };
    this.writeFile(Path.join(this.PROJECT_DIR, project.projectName, "src"), "index.toml", createIndexToml(project));
    project.files.toArray().forEach(it => {
      const paths = it.fullName.split(".");
      const fileName = paths.pop();
      this.writeFile(Path.join(this.PROJECT_DIR, project.projectName, "src", ...paths), fileName!, createComponentFile(it));
    });
  }
}
export const fileManager = new FileManager();