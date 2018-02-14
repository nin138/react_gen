import {Transpiler} from "./transpiler";
import {SavedFile} from "../files/SaveProject";

export class ModuleFileBuilder {
  constructor(private transpiler: Transpiler) {}
  build(file: SavedFile) {
    if(Object.keys(file.store).length == 0) return "";
    return [
      this.createActionNames(file),
      this.createActions(file),
      this.createActionType(file),
      this.createState(file),
      this.createInitialState(file),
      this.createReducer(file)
    ].join("\n\n")
  }
  private createActionNames = (file: SavedFile) => {
    return `enum ActionNames {\n` +
        `${Object.keys(file.actions).map(it => `${this.transpiler.createTab(1)}${it} = "${file.name}.${it}"`).join(",\n")}` +
        "\n}\n";
  };
  private createActions = (file: SavedFile) => {
    const createActionInterface = (name: string, params: {[param: string]: string}) => {
      return `interface ${name}Action {\n` +
          `${this.transpiler.createTab(1)}type: ActionNames.${name},` +
          Object.keys(params).map(param => `\n${this.transpiler.createTab(1)}${param}: ${params[param]}`).join(",") +
          "\n}\n";
    };
    const createActionFunc = (name: string, params: {[param: string]: string}) => {
      return `export const ${name} = (${Object.keys(params).map(param => `${param}: ${params[param]}`).join(", ")}) => ({\n` +
          `${this.transpiler.createTab(1)}type: ActionNames.${name},` +
          Object.keys(params).map(it => "\n" + this.transpiler.createTab(1) + it).join(",") +
          "\n});\n";
    };
    return Object.keys(file.actions)
        .map(name => {
          const action = file.actions[name];
          return `${createActionInterface(name, action)}\n${createActionFunc(name, action)}`
        }).join("\n\n");
  };
  private createActionType = (file: SavedFile) => {
    if(Object.keys(file.actions).length === 0) return "";
    return `export type ${file.name}Action =\n` +
        Object.keys(file.actions).map(it => `${this.transpiler.createTab(1)}${it}Action`).join(" |\n")
  };
  private createState = (file: SavedFile) => {
    if(Object.keys(file.store).length === 0) return "";
    return `export interface ${file.name}State {\n` +
        Object.keys(file.store)
            .map(it => `${this.transpiler.createTab(1)}${it}: ${file.store[it]}`)
            .join("\n") +
        "\n}\n";
  };
  private createInitialState = (file: SavedFile) => {
    return `const initialState: ${file.name}State = {\n` +
        Object.keys(file.initialStore)
            .map(it => `${this.transpiler.createTab(1)}${it}: ${file.initialStore[it]}`)
            .join(",\n") +
        "\n};\n";
  };
  private createReducer = (file: SavedFile) => {
    const createCase = (name: string, fn: string) => {
      const parse = (fn: string) => {
        const l = fn.split(" = ");
        return `${l[0]}: ${l[1]}`;
      };
      return `${this.transpiler.createTab(2)}case ActionNames.${name}:\n${this.transpiler.createTab(3)}return Object.assign({}, state, { ${parse(fn)} });\n`
    };
    return `export default function reducer(state: ${file.name}State = initialState, action: ${file.name}Action): ${file.name}State {\n` +
        `${this.transpiler.createTab(1)}switch(action.type) {\n` +
        Object.keys(file.reducer)
            .map(it => createCase(it, file.reducer[it]))
            .join("") +
        `${this.transpiler.createTab(2)}default: return state;\n` +
        `${this.transpiler.createTab(1)}}\n}\n`;
  };

}