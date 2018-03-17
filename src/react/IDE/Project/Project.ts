import {SavedFile} from "../../../files/SaveProject";
import {
  NinComponentInfo,
  NinComponentString, NinElement,
  ROOT_ID
} from "../../Entities/NinElement";
import {SavedCss, SavedIndex} from "../../../files/FileManager";
import {List, Map} from "immutable"
import {NodeUtil} from "../../../Util";
import {HTML_PATH, HTML_TAGS} from "../../Html/Tags";
import {CssClassManager} from "../../Css/CssClassManager";
import {ComponentFile} from "./ComponentFile";
import Css from "../../Css/Css";

export class Project {
  version: string;
  groupName: string;
  projectName: string;
  root: string;
  files: Map<string, ComponentFile>;
  activeFile: string;
  cssManager: CssClassManager;
  constructor(index: SavedIndex, files: Array<SavedFile>, css: SavedCss) {
    this.cssManager = new CssClassManager().loadSavedCss(css);
    this.groupName = index.group;
    this.version = index.version;
    this.root = index.root;
    this.projectName = index.project;
    const map: {[key: string]: ComponentFile} = {};
    const tmpFiles: List<ComponentFile> = List(files.map(it => new ComponentFile(`${it.path}.${it.name}`)));

    files.forEach(it => {
      let elements: Map<string, NinElement> = Map();
      it.node.forEach(node => {
        const info: NinComponentInfo =
          (NodeUtil.getPathFromFullName(node.type) === HTML_PATH)? HTML_TAGS.find(it => `${it!.path}.${it!.type}` === node.type)!
          : tmpFiles.find(it => it!.fullName() == node.type).getComponentInitializer();
        elements = elements.set(node.id, NinElement.fromSavedNode(info, node));
      });
      let fullName = `${it.path}.${it.name}`;
      if(fullName.startsWith(".")) fullName = fullName.slice(1);
      map[fullName] = new ComponentFile(fullName, elements);
    });
    this.files = Map(map);
    this.activeFile = index.root;
  }
  getActiveFile(): ComponentFile {
    return this.files.get(this.activeFile);
  }
  getComponentInfo(fullName: string): NinComponentInfo {
    const path = fullName.split(".");
    const type = path.pop();
    if(path.join(".") == HTML_PATH) return HTML_TAGS.find(it => it!.type === type)!;
    return this.files.get(fullName).getComponentInitializer();
  }
  private copy(...differ: Array<object>): Project {
    return Object.assign(Object.create(Project.prototype), this, ...differ)
  }
  changeActiveFile(fileName: string): Project {
    return this.copy({ activeFile: fileName });
  }
  addFile(fullName: string, elements = Map<string, NinElement>()): Project {
    return this.copy({ files: this.files.set(fullName, new ComponentFile(fullName, elements))});
  }

  // node
  addNode(element: NinElement): Project {
    return this.copy({ files: this.files.update(this.activeFile, it => it.addNode(element)) });
  }
  moveNode(moveNodeId: string, parentId: string, ref: string | null): Project {
    return this.copy({ files: this.files.update(this.activeFile, it => it.moveNode(moveNodeId, parentId, ref)) });
  }
  removeNode(id: string): Project {
    return this.copy({ files: this.files.update(this.activeFile, it => it.removeNode(id))});
  }
  addCssClassToNode(id: string, className: string): Project {
    return this.copy({ files: this.files.update(this.activeFile, it => it.addCssClassToNode(id, className)) });
  }
  removeCssClassFromNode(id: string, className: string): Project {
    return this.copy({ files: this.files.update(this.activeFile, it => it.removeCssClassFromNode(id, className))});
  }
  changeNodeAttribute(id: string, attr: string, value: string): Project {
    return this.copy({ files: this.files.update(this.activeFile, it => it.changeAttribute(id, attr, value)) });
  }
  rebuildTree(list: Array<{parent: string, id: string, fullName: string, children: Array<string>}>) {
    return this.copy({ files: this.files.update(this.activeFile, it => it.rebuildTree(this, list))});
  }
  componentize(id: string, componentName: string): Project {
    let nodes = this.files.get(this.activeFile).copyNodes(id).update(id, it => it.changeParent(ROOT_ID));
    const ret = this
        .addFile("components." + componentName, nodes)
        .removeNode(id);
    const parent = this.files.get(this.activeFile).elements.get(id).parent;
    return ret.addNode(new NinElement(ret.files.get("components." + componentName).getComponentInitializer(), parent,));
  }
  getHTMLString(fileName: string = this.activeFile) {
    const getFileHtml = (file: ComponentFile): string => {
      const getNodeHtml = (node: NinElement, nodes: Map<string, NinElement>): string => {
        if (node.path !== "HTML") {
          return getFileHtml(this.files.get(`${node.path}.${node.type}`));
        }
        if(node.type === "textNode") {
          return node.attributes.get("text") || "";
        }
        const children = node.children.map(it => getNodeHtml(nodes.get(it!), nodes)).join("");
        const attrString = NodeUtil.getAttrStr(node.attributes, this.getComponentInfo(node.fullName()))
        + (node.classList.size != 0)? ` class="${node.classList.join(" ")}"` : "";
        return this.getHTMLRow(node.type)
          .replace(NinComponentString.Attributes, attrString)
          .replace(NinComponentString.Children, children);
      };
      return file.elements.filter(it => it!.parent == ROOT_ID).map(it => getNodeHtml(it!, file.elements)).join("");
    };
    return getFileHtml(this.files.get(fileName));
  }
  private getHTMLRow(tag: string): string {
      const initializer = HTML_TAGS.find(it => it!.type == tag)!;
      return (initializer.hasChild)? `<${tag}${NinComponentString.Attributes}>${NinComponentString.Children}</${tag}>` : `<${tag}${NinComponentString.Attributes}/>`
  }

  // css manager

  createCssClass(className: string, css: Css): Project {
    return this.copy({cssManager: this.cssManager.add(className, css)})
  }
  changeCssValue(className: string, attr: string, value: string): Project {
    return this.copy({cssManager: this.cssManager.updateAttr(className, attr, value)})
  }
 }