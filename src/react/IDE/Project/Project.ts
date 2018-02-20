import {ComponentManager, initialComponentManager} from "../../Html/ComponentManager";
import {SavedFile} from "../../../files/SaveProject";
import {
  createNinComponentInitializer, NinComponentInitializer, NinComponentString, NinElement,
  ROOT_ID
} from "../../Entities/NinComponent";
import {SavedIndex} from "../../../files/FileManager";
import {Map} from "immutable"

export class Project {
  version: string;
  groupName: string;
  projectName: string;
  root: string;
  files: Map<string, ComponentFile>;
  activeFile: string;
  componentManager: ComponentManager;
  constructor(index: SavedIndex, files: Array<SavedFile>, componentManager: ComponentManager = initialComponentManager()) {
    const createInitializer = (file: SavedFile): NinComponentInitializer => {
      return ({
        path: file.path,
        type: file.name,
        isFrame: false,
        allowChild: false,
        row: "require read",
        editable: {
          attributes: [],
          hasCss: false,
          custom: {}
        }
      })
    };
    this.groupName = index.group;
    this.version = index.version;
    this.root = index.root;
    this.projectName = index.project;
    this.componentManager = componentManager.setArray(files.map(it => createInitializer(it)));
    const map: {[key: string]: ComponentFile} = {};
    files.forEach(it => {
      let elements: Map<string, NinElement> = Map();
      it.node.forEach(node => {
        elements = elements.set(node.id, NinElement.fromSavedNode(this.componentManager.getInitializer(node.type), node));
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
  private copy(...differ: Array<object>): Project {
    return Object.assign(Object.create(Project.prototype), this, ...differ)
  }
  changeActiveFile(fileName: string): Project {
    return this.copy({ activeFile: fileName });
  }
  addFile(fullName: string, elements = Map<string, NinElement>()): Project {
    return this.copy({ files: this.files.set(fullName, new ComponentFile(fullName, elements))});
  }
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
  componentize(id: string, componentName: string): Project {
    let nodes = this.files.get(this.activeFile).copyNodes(id).update(id, it => it.changeParent(ROOT_ID));
    const ret = this
        .addComponentToManager(createNinComponentInitializer(componentName, nodes))
        .addFile("components." + componentName, nodes)
        .removeNode(id);
    const parent = this.files.get(this.activeFile).elements.get(id).parent;
    return ret.addNode(new NinElement(ret.componentManager.getInitializer("components." + componentName), parent,));
  }
  addComponentToManager(...initializers: Array<NinComponentInitializer>) {
    return this.copy({componentManager: this.componentManager.setArray(initializers)});
  }
  getHTMLString(fileName: string = this.activeFile) {

    const getFileHtml = (file: ComponentFile): string => {
      const getNodeHtml = (node: NinElement, nodes: Map<string, NinElement>): string => {
        if (node.path !== "HTML") {
          return getFileHtml(this.files.get(`${node.path}.${node.type}`));
        }
        if(node.type === "textNode") {
          const attr = node.editable.attributes.find(it => it!.name === "text");
          return (attr)? attr.value : "";
        }
        const classes = (node.editable.hasCss && !node.editable.classList!!.isEmpty())?
            ` class="${node.editable.classList!!.join(" ")}"` : "";
        const children = node.children.map(it => getNodeHtml(nodes.get(it!), nodes)).join("");
        return node.row
            .replace(NinComponentString.ClassName, classes)
            .replace(NinComponentString.Children, children)
      };
      if(file.elements.filter(it => it!.parent == ROOT_ID).size != 1) return "rendering problem"//todo
      const root = file.elements.find(it => it!.parent == ROOT_ID);
      return getNodeHtml(root, file.elements)
    };
    return getFileHtml(this.files.get(fileName));
  }
}




export class ComponentFile {
  fullName: string;
  elements: Map<string, NinElement>;
  constructor(fullName: string, elements: Map<string, NinElement> = Map()) {
    this.fullName = fullName;
    this.elements = elements;
  }
  private copy(...differ: Array<object>): ComponentFile {
    return Object.assign(Object.create(ComponentFile.prototype), this, ...differ)
  }

  addNode(element: NinElement): ComponentFile {
    if(element.parent == ROOT_ID) return this.copy({ elements: this.elements.set(element.id, element) });
    return this.copy({ elements: this.elements.set(element.id, element).update(element.parent, it => it.addChild(element.id)) });
  }
  removeNode(id: string): ComponentFile {
    let ret = this.elements;
    ret = (ret.get(id).parent !== ROOT_ID)? ret.update(ret.get(id).parent, it => it.removeChild(id)) : ret;
    const remove = (id: string) => {
      const children = this.elements.get(id).children;
      children.forEach(it => {
        remove(it!);
      });
      ret = ret.delete(id);
    };
    remove(id);
    return this.copy({ elements: ret });
  }
  moveNode(moveNodeId: string, parentId: string, ref: string | null): ComponentFile {
    const moveNode = this.elements.get(moveNodeId);
    const oldParentId = moveNode.parent;
    if(moveNode.id === parentId) return this;
    let newElements = this.elements
        .update(moveNode.id, v => v.changeParent(parentId));
    if(parentId !== ROOT_ID) newElements = newElements.update(parentId, v => v.addChild(moveNode.id, ref));
    if(oldParentId !== ROOT_ID) newElements = newElements.update(oldParentId, v => v.removeChild(moveNode.id));
    return this.copy({elements: newElements});
  }
  addCssClassToNode(id: string, className: string): ComponentFile {
    return this.copy({ elements: this.elements.update(id, it => it.addCssClass(className)) });
  }
  removeCssClassFromNode(id: string, className: string): ComponentFile {
    return this.copy({ elements: this.elements.update(id, it => it.removeCssClass(className)) });
  }
  changeAttribute(id: string, attr: string, value: string): ComponentFile {
    console.log("//LOOP");
    this.elements.forEach(it => {
      console.log(`${it!.id}, ${it!.editable.attributes.find(it => it!.name == "text")}`);
      console.log(it!.editable);
    });
    console.log("//END LOOP");
    return this.copy( { elements: this.elements.update(id, it => {
      console.log("up:" + it.id);
      return it.changeAttribute(attr, value + it.id)
    })});
  }
  copyNodes(id: string): Map<string, NinElement> {
    let ret = Map<string, NinElement>();
    const get = (id: string) => {
      this.elements.get(id).children.forEach(it => get(it!));
      ret = ret.set(id, this.elements.get(id));
    };
    get(id);
    return ret;
  }
}