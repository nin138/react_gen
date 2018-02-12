import {Map} from "immutable"
import {
  createNinComponentInitializer, NinComponentInitializer, NinComponentString, NinElement,
  ROOT_ID
} from "../../Entities/NinComponent";
import {ComponentManager, initialComponentManager} from "../../Html/ComponentManager";

enum ActionNames {
  loadProject = "Project.loadProject",
  changeSelectedElement = "Project.changeSelectedElement",
  addFile = "Project.AddFile",
  createNode = "Project.CreateNode",
  moveNode = "Project.MoveNode",
  addCssClassToComponent = "Project.AddCssClassToComponent",
  changeAttribute = "Project.ChangeAttribute",
  removeCssFromComponent = "Project.RemoveCssFromComponent",
  componentize = " Project.Componentize",
  changeActiveFile = "Project.changeActiveFile",
}

interface LoadProjectAction {
  type: ActionNames.loadProject,
  projectName: string,
  files: Map<string, ComponentFile>,
  root: string
}
export const loadProject = (projectName: string, files: Map<string, ComponentFile>, root: string): LoadProjectAction => ({
  type: ActionNames.loadProject,
  projectName,
  files,
  root
});


interface ChangeSelectedElement {
  type: ActionNames.changeSelectedElement,
  id: string
}

export const changeSelectedElement = (id: string): ChangeSelectedElement => ({
  type: ActionNames.changeSelectedElement,
  id
});

interface AddFileAction {
  type: ActionNames.addFile,
  fullName: string
}
export const addFile = (fullName: string): AddFileAction => ({
  type: ActionNames.addFile,
  fullName,
});

interface CreateNodeAction {
  type: ActionNames.createNode
  node: NinElement
  parent: string
}
export const createNode = (node: NinElement, parent: string): CreateNodeAction => ({
  type: ActionNames.createNode,
  node,
  parent
});

interface MoveNodeAction {
  type: ActionNames.moveNode
  moveNodeId: string
  parentId: string
  ref: string | null
}
export const moveNode = (moveNodeId: string, parentId: string, ref: string | null): MoveNodeAction => ({
  type: ActionNames.moveNode,
  moveNodeId,
  parentId,
  ref
});

interface AddCssClassToComponentAction {
  type: ActionNames.addCssClassToComponent
  id: string
  className: string
}
export const addCssClassToComponent = (id: string, className: string): AddCssClassToComponentAction => ({
  type: ActionNames.addCssClassToComponent,
  id,
  className,
});

interface ChangeAttributeAction {
  type: ActionNames.changeAttribute,
  targetId: string,
  attr: string,
  value: string,
}
export const changeAttribute = (targetId: string, attr: string, value: string): ChangeAttributeAction => ({
  type: ActionNames.changeAttribute,
  targetId,
  attr,
  value
});

interface RemoveCssFromComponentAction {
  type: ActionNames.removeCssFromComponent
  id: string
  className: string
}
export const removeCssFromComponent = (id: string, className: string): RemoveCssFromComponentAction => ({
  type: ActionNames.removeCssFromComponent,
  id,
  className,
});

interface ComponentizeAction {
  type: ActionNames.componentize,
  id: string,
  componentName: string
}
export const componentize = (id: string, componentName: string): ComponentizeAction => ({
  type: ActionNames.componentize,
  id,
  componentName
});

interface ChangeActiveFileAction {
  type: ActionNames.changeActiveFile,
  fileName: string
}

export const changeActiveFile = (fileName: string): ChangeActiveFileAction => ({
  type: ActionNames.changeActiveFile,
  fileName
});

export class Project {
  version: string;
  groupName: string;
  projectName: string;
  root: string;
  files: Map<string, ComponentFile>;
  activeFile: string;
  componentManager: ComponentManager;
  constructor(projectName: string, files: Map<string, ComponentFile>, activeFile: string = "App", componentManager: ComponentManager = initialComponentManager) {
    this.groupName = "group1"; // todo;
    this.version = "1.0.0"; //todo;
    this.root = "src/App";//todo
    this.projectName = projectName;
    this.files = files;
    this.activeFile = activeFile;
    this.componentManager = componentManager;
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
  addComponentToManager(initializer: NinComponentInitializer) {
    return this.copy({componentManager: this.componentManager.set(initializer)});
  }
  getHTMLString(fileName: string = this.activeFile) {

    const getFileHtml = (file: ComponentFile): string => {
      const getNodeHtml = (node: NinElement, nodes: Map<string, NinElement>): string => {
        if (node.path !== "HTML") {
          return getFileHtml(this.files.get(`${node.path}.${node.type}`));
        }
        if(node.type === "textNode") return node.editable.attributes.get("text").value;
        const classes = (node.editable.hasCss && !node.editable.classList!!.isEmpty())?
            ` class="${node.editable.classList!!.join(" ")}"` : "";
        const children = node.children.map(it => getNodeHtml(nodes.get(it!), nodes)).join();
        return node.row
            .replace(NinComponentString.ClassName, classes)
            .replace(NinComponentString.Children, children)
      };
      if(file.elements.filter(it => it!.parent == ROOT_ID).size != 1) return "rendering problem"//todo
      const root = file.elements.find(it => it!.parent == ROOT_ID);
      return getNodeHtml(root, file.elements)
    };
    console.log(fileName);
    console.log(this.files.get(fileName));
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
    return this.copy( { elements: this.elements.update(id, it => it.changeAttribute(attr, value))});
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

export type ProjectAction =
    AddFileAction
  | LoadProjectAction
  | CreateNodeAction
  | MoveNodeAction
  | AddCssClassToComponentAction
  | RemoveCssFromComponentAction
  | ChangeAttributeAction
  | ComponentizeAction
  | ChangeActiveFileAction

const initialState: Project = Object.assign(Object.create(Project.prototype),{
  projectName: "",
  files: Map(),
  activeFile: "App"
});

export default function reducer(state: Project = initialState, action: ProjectAction): Project {
  switch (action.type) {
    case ActionNames.loadProject: return new Project(action.projectName, action.files, action.root);
    case ActionNames.addFile: return state.addFile(action.fullName);
    case ActionNames.createNode: return state.addNode(action.node);
    case ActionNames.moveNode: return state.moveNode(action.moveNodeId, action.parentId, action.ref);
    case ActionNames.addCssClassToComponent: return state.addCssClassToNode(action.id, action.className);
    case ActionNames.removeCssFromComponent: return state.removeCssClassFromNode(action.id, action.className);
    case ActionNames.changeAttribute: return state.changeNodeAttribute(action.targetId, action.attr, action.value);
    case ActionNames.componentize: return state.componentize(action.id, action.componentName);
    case ActionNames.changeActiveFile: return state.changeActiveFile(action.fileName);
    default: { return state }
  }
}
