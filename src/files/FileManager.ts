import * as fs from "fs-extra";
import * as Path from "path";
import {Project} from "../react/IDE/Project/Modules";
import {Toml} from "../Util";
import {createComponentFile, SavedFile} from "./SaveProject";
import {ROOT_ID} from "../react/Entities/NinComponent";
const shortId = require("shortid");
export interface SavedIndex {
  group: string
  project: string
  version: string
  root: string
  css : string
  dependency: Array<string>
}

export const ENCODING = "utf8";

class FileManager {
  ROOT_DIR: string;
  PROJECT_DIR: string;
  setRootDir(dir: string) {
    this.ROOT_DIR = dir;
    this.PROJECT_DIR = Path.join(this.ROOT_DIR, "projects");
  }
  makeProjectDir(prjName: string) {
    fs.mkdirsSync(Path.join(this.PROJECT_DIR, prjName));
  }
  getProjectNames(): Array<string> {
    try {
      return fs.readdirSync(this.PROJECT_DIR)
          .filter(it => it !== ".DS_Store");
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
    fs.removeSync(Path.join(this.PROJECT_DIR, project.projectName, "src"));
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
      this.writeFile(Path.join(this.PROJECT_DIR, project.projectName, "src", ...paths), fileName! + ".toml", createComponentFile(it));
    });
  }
  createNewProject(projectName: string, group: string) {
    const index: SavedIndex = {
      group: group,
      project: projectName,
      version: "0.0.1",
      root: "App",
      css : "",
      dependency: [],
    };
    const app: SavedFile = {
      path: "",
      name: "App",
      props: {},
      state: {},
      store: {},
      initialStore: {},
     actions: {},
      reducer: {},
      node: [{
        type: "HTML.div",
        id: shortId.generate(),
        parent: ROOT_ID,
        children: [],
        className: [],
        attribute: [],
      }]
    };
    const prj = new Project(index, [app]);
    this.saveProject(prj);
  }
  loadProject(projectName: string): {files: Array<SavedFile>, index: SavedIndex} {
    const data = fs.readFileSync(Path.join(this.PROJECT_DIR, projectName, "src", "index.toml"), ENCODING);
    const index: SavedIndex = Toml.parse(data);
    const files = this.readSubDirSync(Path.join(this.PROJECT_DIR, projectName, "src"))
        .filter(it => !it.includes("index.toml"))
        .filter(it => !it.includes(".DS_Store"))
        .map(it => {
          const file: SavedFile = Toml.parse(fs.readFileSync(it, ENCODING));
          file.path = Path.relative(Path.join(this.PROJECT_DIR, projectName, "src"), it)
              .split(Path.sep)
              .slice( 0, -1 )
              .join(".");
          return file;
        });
    return ({
      files,
      index
    });
  }
  readSubDirSync(folderPath: string) {
    let result: Array<string> = [];
    const readTopDirSync = ((folderPath: string) => {
      let items = fs.readdirSync(folderPath);
      items = items.map((itemName) => {
        return Path.join(folderPath, itemName);
      });
      items.forEach((itemPath) => {
        if (fs.statSync(itemPath).isDirectory()) readTopDirSync(itemPath);
        else result.push(itemPath);
      });
    });
    readTopDirSync(folderPath);
    return result;
  };
}
export const fileManager = new FileManager();