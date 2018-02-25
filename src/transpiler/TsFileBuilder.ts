import {getAttrFromSavedNode, SavedFile, SavedNode} from "../files/SaveProject";
import {Transpiler} from "./transpiler";
import * as path from "path";
import {NodeUtil, Util} from "../Util";
import {HTML_TAGS} from "../react/Html/Tags";

export class TsFileBuilder {
  private static readonly REQUIRED_IMPORT = [
    `import * as React from "react";`,
  ];
  constructor(private transpiler: Transpiler) {}

  toTs(file: SavedFile): string {
    return [
      this.resolveDependency(file),
      this.createIFProps(file),
      this.createIFState(file),
      this.createClass(file)
    ].join("\n");
  }
  private resolveDependency(file: SavedFile): string {
    return [TsFileBuilder.REQUIRED_IMPORT,
        ...file.node.map(it => it.type)
        .filter(it => !it.startsWith("HTML."))
        .map(it =>
            `import {${Util.capitalizeFirst(it.split(".").pop()!)}} from "./${path.relative(
                path.join(...file.path.split(".")), 
                path.join(...it.split(".")))
        }";`)].join("\n") + "\n";
    // if(file.use)
  };
  private createKeyType(map: {[key: string]: string}): string {
    return Object.keys(map)
        .map(it => `${this.transpiler.createTab(1)}${it}: ${map[it]}`)
        .join("\n");
  };
  private createIFProps(file: SavedFile): string {
    return `interface Props {\n${this.createKeyType(file.props)}}\n`;
  };
  private createIFState(file: SavedFile): string {
    if(Object.keys(file.state).length == 0) return "";
    return `interface State {\n${this.createKeyType(file.props)}}\n`;
  };

  private createClass(file: SavedFile): string {
    return `export class ${file.name} extends React.Component<Props, ${(Object.keys(file.state).length !== 0)? "State" : "{}"}> {\n`
        + this.createRender(file)
        + "}\n";
  }
  private createRender(file: SavedFile): string {
    let ret = `${this.transpiler.createTab(1)}render() {\n${this.transpiler.createTab(2)}return (\n`;
    const map: Map<string, SavedNode> = new Map();
    file.node.forEach(it => map.set(it.id, it));
    const tmp = file.node.filter(it => it!.parent == "root");
    if(tmp.length == 0) throw new Error("Empty body Component");
    if(tmp.length != 1) throw new Error("more than 1 root Node found");
    const root: SavedNode= tmp[0];
    ret += this.createJSX(root.id, map, 3) + "\n";
    ret += `${this.transpiler.createTab(2)})\n`;
    ret += `${this.transpiler.createTab(1)}}\n`;
    return ret;
  }
  private createJSX(id: string, map: Map<string, SavedNode>, tab: number): string {
    const node = map.get(id)!!;
    const attrs = NodeUtil.getAttrsStrFromSavedNode(node);
    let tag: string = node.type.split(".").pop()!;
    if(node.type === "HTML.textNode") return `${this.transpiler.createTab(tab)}${getAttrFromSavedNode("text", node)!.value || ""}\n`;
    if(node.type.startsWith("HTML.")) {
      const conf = HTML_TAGS.find(it => it.type === tag);
      if(!conf) throw new Error(`${node.type} is not defined in HTML5`);
    } else tag = Util.capitalizeFirst(tag);
    if(node.children.length === 0) return `${this.transpiler.createTab(tab)}<${tag}${attrs} />\n`;
    return `${this.transpiler.createTab(tab)}<${tag}${attrs}>\n`
        + node.children.map(it => this.createJSX(it, map, tab+1)).join("\n") + "\n"
        + `${this.transpiler.createTab(tab)}</${tag}>`;
  };
}
