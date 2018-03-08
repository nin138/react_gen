import * as fs from "fs-extra";
import * as path from "path";
import {ENCODING} from "../files/FileManager";
import {TsFileBuilder} from "./TsFileBuilder";
import {ModuleFileBuilder} from "./ModuleFileBuilder";
import {StoreBuilder} from "./StoreBuilder";
import {Project} from "../react/IDE/Project/Project";
import {ComponentFile} from "../react/IDE/Project/ComponentFile";


export interface Settings {
  USE_TAB_CHARACTER: boolean
  TAB_SIZE: number
}
const DEFAULT_SETTING = {
  USE_TAB_CHARACTER: false,
  TAB_SIZE: 2,
};


export class Transpiler2 {
  settings: Settings;
  outDir: string;
  project: Project;
  constructor(settings: Settings = DEFAULT_SETTING) {
    this.settings = settings;
  }
  transpile = async (project: Project, outDir: string) => {
    const tsFileBuilder = new TsFileBuilder(this, project);
    const moduleFileBuilder = new ModuleFileBuilder(this);
    const storeBuilder = new StoreBuilder(this);
    this.project = project;
    this.outDir = outDir;
    await fs.remove(outDir);
    const modules: Array<{name: string, path: string}> = [];
    project.files.forEach(async (file: ComponentFile) => {
      const ts = tsFileBuilder.toTs(file);
      await this.writeFile(path.join(this.outDir, "src", file.path), file.name + ".tsx", ts);
      if(file.store.size !== 0) {
        modules.push({name: file.name, path: file.path});
        const module = moduleFileBuilder.create(file);
        await this.writeFile(path.join(this.outDir, "src", file.path), file.name + "Module.ts", module);
      }
    });
    await this.copyTemplate(modules.length == 0);
    const store = storeBuilder.build(modules);
    if(modules.length !== 0)await this.writeFile(path.join(this.outDir, "src"), "Store.ts", store);
    await this.createCss();
    //todo
  };
  createTab = (num: number): string => {
    const char = (this.settings.USE_TAB_CHARACTER)? "\t" : Array(this.settings.TAB_SIZE + 1).join(" ");
    return Array(num + 1).join(char);
  };
  private writeFile = async(dir: string, fileName: string, data: string) => {
    if(!await fs.pathExists(dir)) await fs.mkdirs(dir);
    return fs.writeFile(path.join(dir, fileName), data);
  };
  private copyTemplate = async(isNoStore: boolean) => {
    await fs.copy('./template/no_replace', this.outDir);
    const packageJson = await fs.readFile(`./template/package.json`, ENCODING);
    await fs.copy(!isNoStore? "./template/index.tsx" : "./template/index-no-store.tsx", path.join(this.outDir, "src", "index.tsx"));
    await fs.writeFile(path.join(this.outDir, "package.json"),
      packageJson
        .replace("${APP_NAME}", this.project.projectName)
        .replace("${VERSION}", this.project.version)
      , ENCODING);
  };
  private createCss = async () => {
    const css = this.project.cssManager.getCssString();
    await this.writeFile(path.join(this.outDir, "dist"), "style.css", css);
  };
}