import {Map} from "immutable"
import {createRoot, NinElement} from "../../Entities/NinComponent";

enum ActionNames {
  loadProject = "Project.loadProject",
  changeSelectedElement = "Project.changeSelectedElement",
  addFile = "Project.AddFile",
  createNode = "Project.CreateNode",
  moveNode = "Project.MoveNode",
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



export class Project {
  projectName: string;
  files: Map<string, ComponentFile>;
  activeFile: string;
  constructor(projectName: string, files: Map<string, ComponentFile>, activeFile: string = "App") {
    this.projectName = projectName;
    this.files = files;
    this.activeFile = activeFile;
  }
  getActiveFile(): ComponentFile {
    return this.files.get(this.activeFile);
  }
  private copy(...differ: Array<object>): Project {
    return Object.assign(Object.create(Project.prototype), this, ...differ)
  }
  addFile(fullName: string) {
    return this.copy({ files: this.files.set(fullName, new ComponentFile(fullName))});
  }
  addNode(element: NinElement): Project {
    return this.copy({ files: this.files.update(this.activeFile, it => it.addNode(element)) });
  }
  moveNode(moveNodeId: string, parentId: string, ref: string | null): Project {
    return this.copy({ files: this.files.update(this.activeFile, it => it.moveNode(moveNodeId, parentId, ref)) })
  }

}


export class ComponentFile {
  fullName: string;
  elements: Map<string, NinElement>;
  constructor(fullName: string, elements: Map<string, NinElement> = Map({root: createRoot()})) {
    this.fullName = fullName;
    this.elements = elements;
  }
  private copy(...differ: Array<object>): ComponentFile {
    return Object.assign(Object.create(ComponentFile.prototype), this, ...differ)
  }
  addNode(element: NinElement) {
    return this.copy({ elements: this.elements.set(element.id, element).update(element.parent, it => it.addChild(element.id)) });
  }
  moveNode(moveNodeId: string, parentId: string, ref: string | null) {
    const moveNode = this.elements.get(moveNodeId);
    const oldParentId = moveNode.parent;
    if(moveNode.id === parentId) return this;
    const newElements = this.elements
        .update(moveNode.id, v => v.changeParent(parentId))
        .update(oldParentId, v => v.removeChild(moveNode.id))
        .update(parentId, v => v.addChild(moveNode.id, ref));
    return this.copy({elements: newElements});
  }
}

export type ProjectAction =
    AddFileAction
  | LoadProjectAction
  | CreateNodeAction
  | MoveNodeAction

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
    default: { return state }
  }
}
