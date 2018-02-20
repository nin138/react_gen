import {Map} from "immutable"
import {SavedFile} from "../../../files/SaveProject";
import {SavedIndex} from "../../../files/FileManager";
import {NinElement} from "../../Entities/NinComponent";
import {Project} from "./Project";

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
  index: SavedIndex,
  files: Array<SavedFile>
}
export const loadProject = (index: SavedIndex, files: Array<SavedFile>): LoadProjectAction => ({
  type: ActionNames.loadProject,
  index,
  files
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
    case ActionNames.loadProject: return new Project(action.index, action.files);
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
