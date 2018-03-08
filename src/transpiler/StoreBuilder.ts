import {Transpiler2} from "./transpiler";

export class StoreBuilder {
  constructor(private transpiler: Transpiler2) {}
  build(modules: Array<{name: string, path: string}>) {
    return [
      this.createImport(modules),
      this.createCreateStore(modules),
      this.createState(modules),
      this.createAction(modules)
    ].join("\n\n");
  }
  private createImport = (modules: Array<{name: string, path: string}>) => {
    return "import {createStore, combineReducers, Action} from \"redux\"\n" +
        modules.map(it => `import ${it.name}, {${it.name}Action, ${it.name}State} from "./${it.name}Module"` )
            .join("\n");
  };
  private createCreateStore = (modules: Array<{name: string, path: string}>) => {
    return "export default createStore(\n" +
        `${this.transpiler.createTab(1)}combineReducers({\n` +
        `${modules.map(it => `${this.transpiler.createTab(2)}${it.name},`).join("\n")}\n` +
        `${this.transpiler.createTab(1)}})\n` +
        ");";
  };
  private createState = (modules: Array<{name: string, path: string}>) => {
    return "export type RootState = {\n" +
        `${this.transpiler.createTab(1)}${modules.map(it => `${it.name}: ${it.name}State`).join("\n")}` +
        "\n}";
  };
  private createAction = (modules: Array<{name: string, path: string}>) => {
    return "export type RootAction = Action\n" +
        `${modules.map(it => `${this.transpiler.createTab(1)}| ${it.name}Action`).join("\n")}`
  };
}
