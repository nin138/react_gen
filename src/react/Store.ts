import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import edit, { EditAction, EditState } from "./IDE/Edit/Modules";
import log, { LogAction, LogState } from "./IDE/Log/Modules";
import ide, { IDEAction, IDEState } from "./IDE/Modules";
import project, { ProjectAction } from "./IDE/Project/Modules";
import { Project } from "./IDE/Project/Project";
import tree, { TreeAction, TreeState } from "./IDE/Tree/Modules";
import { loggerMiddleware } from "./middleware";
import modal, { ModalAction, ModalState } from "./Modal/Modules";

export default createStore(
  combineReducers({
    ide,
    edit,
    tree,
    log,
    project,
    modal
  }),
  applyMiddleware(loggerMiddleware)
);

export interface AppState {
  ide: IDEState;
  edit: EditState;
  tree: TreeState;
  log: LogState;
  project: Project;
  modal: ModalState;
}

export type AppAction =
  | Action
  | IDEAction
  | EditAction
  | TreeAction
  | LogAction
  | ProjectAction
  | ModalAction;
