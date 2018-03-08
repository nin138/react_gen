import {Transpiler2} from "./transpiler";
import * as path from "path";
import {NodeUtil, Util} from "../Util";
import {HTML_PATH, HTML_TAGS} from "../react/Html/Tags";
import {ComponentFile} from "../react/IDE/Project/ComponentFile";
import {List, Map} from "immutable";
import {NinElement, ROOT_ID} from "../react/Entities/NinElement";
import {Project} from "../react/IDE/Project/Project";



export class TsFileBuilder {
  project: Project;
  private static readonly REQUIRED_IMPORT = [
    `import * as React from "react";`,
  ];
  constructor(private transpiler: Transpiler2, project: Project) {
    this.project = project;
  }

  toTs(file: ComponentFile): string {
    return [
      this.resolveDependency(file),
      this.createIFProps(file),
      this.createIFState(file),
      this.createClass(file)
    ].join("\n");
  }
  private resolveDependency(file: ComponentFile): string {
    // todo when import same name component
    return [TsFileBuilder.REQUIRED_IMPORT,
      ...Array.from(new Set(file.elements.map(it => it!.fullName()).valueSeq().toArray()))
        .filter(it => !it.startsWith("HTML."))
        .map(it =>
          `import {${Util.capitalizeFirst(it.split(".").pop()!)}} from "./${path.relative(
            path.join(...file.path.split(".")),
            path.join(...it.split(".")))
            }";`)].join("\n") + "\n";
  };
  private createKeyType(list: List<{name: string, type: string}>): string {
    return list.map(it => `${this.transpiler.createTab(1)}${it!.name}: ${it!.type}`)
      .join("\n");
  };
  private createIFProps(file: ComponentFile): string {
    console.log(file);
    return `interface Props {\n${this.createKeyType(file.props)}}\n`;
  };
  private createIFState(file: ComponentFile): string {
    if(Object.keys(file.state).length == 0) return "";
    return `interface State {\n${this.createKeyType(file.state)}}\n`;
  };

  private createClass(file: ComponentFile): string {
    return `export class ${file.name} extends React.Component<Props, ${(Object.keys(file.state).length !== 0)? "State" : "{}"}> {\n`
      + this.createRender(file)
      + "}\n";
  }
  private createRender(file: ComponentFile): string {
    let ret = `${this.transpiler.createTab(1)}render() {\n${this.transpiler.createTab(2)}return (\n`;
    const roots = file.elements.filter(it => it!.parent == ROOT_ID).toArray()
      .map(it => this.createJSX(it!.id, file.elements, 3));
    if(roots.length == 0) throw new Error("Empty body Component");
    const jsx = (roots.length > 1)? `${this.transpiler.createTab(3)}<React.Fragment>\n${roots.join("\n")}\n${this.transpiler.createTab(3)}</React.Fragment>` : `${roots.join("\n")}`;
    ret += jsx + "\n";
    ret += `${this.transpiler.createTab(2)})\n`;
    ret += `${this.transpiler.createTab(1)}}\n`;
    return ret;
  }
  private createJSX(id: string, map: Map<string, NinElement>, tab: number): string {
    const node = map.get(id)!!;
    const attrs = NodeUtil.getAttrStr(node.attributes, this.project.getComponentInfo(node.fullName()))
     + (node.classList.size !== 0)? ` className="${node.classList.join(" ")}"` : "";
    let tag: string = node.type.split(".").pop()!;
    if(node.fullName() === "HTML.textNode") return `${this.transpiler.createTab(tab)}${node.attributes.get("text") || ""}`;
    if(node.path === HTML_PATH) {
      const conf = HTML_TAGS.find(it => it.type === tag);
      if(!conf) throw new Error(`${node.type} is not defined in HTML5`);
    } else tag = Util.capitalizeFirst(tag);
    if(node.children.size === 0) return `${this.transpiler.createTab(tab)}<${tag}${attrs} />`;
    return `${this.transpiler.createTab(tab)}<${tag}${attrs}>\n`
      + node.children.map(it => this.createJSX(it!, map, tab+1)).join("\n") + "\n"
      + `${this.transpiler.createTab(tab)}</${tag}>`;
  };
}

