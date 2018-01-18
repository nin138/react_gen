import {Map} from "immutable"
import {createRoot, NinComponent} from "../../Entities/NinComponent";

enum ActionNames {
  loadProject = "Project.loadProject",
  changeSelectedElement = "Project.changeSelectedElement",
  addFile = "Project.AddFile"
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

export interface ProjectState {
  projectName: string
  files: Map<string, ComponentFile>
  activeFile: string
}

export type ProjectAction = AddFileAction
  | LoadProjectAction

const initialState: ProjectState = {
  projectName: "",
  files: Map(),
  activeFile: "App"
};

export default function reducer(state: ProjectState = initialState, action: ProjectAction): ProjectState {
  switch (action.type) {
    case ActionNames.loadProject: return Object.assign({}, state, { projectName: action.projectName, files: action.files, activeFile: action.root });
    case ActionNames.addFile: return Object.assign({}, state, { files: state.files.set(action.fullName, new ComponentFile(action.fullName)) });
    default: { return state }
  }
}

export class ComponentFile {
  constructor(public fullName: string, public elements: Map<string, NinComponent> = Map({root: createRoot()})) {

  }
}