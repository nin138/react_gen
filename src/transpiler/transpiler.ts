import * as fs from "fs-extra";
import * as path from "path";
import {ENCODING, SavedIndex} from "../files/FileManager";
import {TsFileBuilder} from "./TsFileBuilder";
import {SavedFile} from "../files/SaveProject";
import {ModuleFileBuilder} from "./ModuleFileBuilder";
import {StoreBuilder} from "./StoreBuilder";


export interface Settings {
  USE_TAB_CHARACTER: boolean
  TAB_SIZE: number
}
const DEFAULT_SETTING = {
  USE_TAB_CHARACTER: false,
  TAB_SIZE: 2,
};

export class Transpiler {
  outDir: string;
  index: SavedIndex;
  files: Array<SavedFile>;
  settings: Settings;
  tsFileBuilder: TsFileBuilder;
  moduleFileBuilder: ModuleFileBuilder;
  storeBuilder: StoreBuilder;
  constructor(settings: Settings = DEFAULT_SETTING) {
    this.settings = settings;
    this.tsFileBuilder = new TsFileBuilder(this);
    this.moduleFileBuilder = new ModuleFileBuilder(this);
    this.storeBuilder = new StoreBuilder(this);
  }
  transpile = async (index: SavedIndex, files: Array<SavedFile>, outDir: string) => {
    this.index = index;
    this.files = files;
    this.outDir = outDir;
    await fs.remove(outDir);
    await this.copyTemplate();
    const modules: Array<{name: string, path: string}> = [];
    this.files.forEach(async it => {
      if(Object.keys(it.store).length !== 0) modules.push({name: it.name, path: it.path});
      const ts = this.tsFileBuilder.toTs(it);
      await this.writeFile(path.join(this.outDir, "src", it.path), it.name + ".tsx", ts);
      const module = this.moduleFileBuilder.build(it);
      if(module) await this.writeFile(path.join(this.outDir, "src", it.path), it.name + "Module.ts", module);
    });
    const store = this.storeBuilder.build(modules);
    await this.writeFile(path.join(this.outDir, "src"), "Store.ts", store);
  };
  private writeFile = async(dir: string, fileName: string, data: string) => {
    if(!await fs.pathExists(dir)) await fs.mkdirs(dir);
    return fs.writeFile(path.join(dir, fileName), data);
  };
  private copyTemplate = async() => {
    await fs.copy('./template/no_replace', this.outDir);
    const packageJson = await fs.readFile(`./template/package.json`, ENCODING);
    return fs.writeFile(path.join(this.outDir, "package.json"),
        packageJson
            .replace("${APP_NAME}", this.index.project)
            .replace("${VERSION}", this.index.version)
        , ENCODING);
  };
  createTab = (num: number): string => {
    const char = (this.settings.USE_TAB_CHARACTER)? "\t" : Array(this.settings.TAB_SIZE + 1).join(" ");
    return Array(num + 1).join(char);
  };
}
