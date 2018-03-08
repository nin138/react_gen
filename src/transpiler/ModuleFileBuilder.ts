import {Transpiler2} from "./transpiler";
import {ComponentFile, NinAction} from "../react/IDE/Project/ComponentFile";

export class ModuleFileBuilder {
  constructor(private transpiler: Transpiler2) {}
  create(file: ComponentFile) {
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
  private createActionNames = (file: ComponentFile) => {
    return `enum ActionNames {\n` +
        `${file.actions.map(it => `${this.transpiler.createTab(1)}${it!.name} = "${file.name}.${it!.name}"`).join(",\n")}` +
        "\n}\n";
  };
  private createActions = (file: ComponentFile) => {
    const createActionInterface = (action: NinAction) => {
      return `interface ${name}Action {\n` +
          `${this.transpiler.createTab(1)}type: ActionNames.${name},` +
          action.prams.map((param, type) => `\n${this.transpiler.createTab(1)}${param}: ${type}`).join(",") +
          "\n}\n";
    };
    const createActionFunc = (action: NinAction) => {
      return `export const ${action.name} = (${action.prams.map((param, type)  => `${param}: ${type}`).join(", ")}) => ({\n` +
          `${this.transpiler.createTab(1)}type: ActionNames.${name},` +
          action.prams.map(it => "\n" + this.transpiler.createTab(1) + it).join(",") +
          "\n});\n";
    };
    return file.actions.map(action => `${createActionInterface(action!)}\n${createActionFunc(action!)}`).join("\n\n");
  };
  private createActionType = (file: ComponentFile) => {
    if(file.actions.size === 0) return "";
    return `export type ${file.name}Action =\n` +
        file.actions.map(it => `${this.transpiler.createTab(1)}${it!.name}Action`).join(" |\n")
  };
  private createState = (file: ComponentFile) => {
    if(Object.keys(file.store).length === 0) return "";
    return `export interface ${file.name}State {\n` +
        file.store
            .map(it => `${this.transpiler.createTab(1)}${it!.name}: ${it!.initial}`)
            .join("\n") +
        "\n}\n";
  };
  private createInitialState = (file: ComponentFile) => {//initialstore??? todo
    return `const initialState: ${file.name}State = {\n` +
        file.state
            .map(it => `${this.transpiler.createTab(1)}${it!.name}: ${it!.initial}`)
            .join(",\n") +
        "\n};\n";
  };
  private createReducer = (file: ComponentFile) => {
    return `export default function reducer(state: ${file.name}State = initialState, action: ${file.name}Action): ${file.name}State {\n` +
        `${this.transpiler.createTab(1)}switch(action.type) {\n` +
        file.reducer
            .map(it => `${this.transpiler.createTab(2)}case ActionNames.${it!.actionName}:\n${this.transpiler.createTab(3)}return ${it!.fn});\n`)
            .join("") +
        `${this.transpiler.createTab(2)}default: return state;\n` +
        `${this.transpiler.createTab(1)}}\n}\n`;
  };

}