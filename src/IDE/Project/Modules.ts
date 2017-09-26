import {Map} from "immutable"

enum ActionNames {
  addFile = "Project.AddFile"
}

interface AddFileAction {
  type: ActionNames.addFile,
  fullName: string
}
export const addFile = (fullName: string) => ({
  type: ActionNames.addFile,
  fullName
});

export interface ProjectState {
  files: Map<string, File>
}

export type ProjectAction = AddFileAction

const initialState: ProjectState = {
  files: Map()
};

export default function reducer(state: ProjectState = initialState, action: ProjectAction): ProjectState {
  switch (action.type) {
    case ActionNames.addFile: return Object.assign({}, state, { files: state.files.set(action.fullName, new File(action.fullName)) });
    default: { return state }
  }
}

export class File {
  constructor(public fullName: string) {

  }
}