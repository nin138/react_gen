import {createStore, combineReducers, Action} from 'redux'
import edit, {EditAction, EditState} from "./IDE/Edit/Modules";
import tree, {TreeAction, TreeState} from "./IDE/Tree/Modules";
import palette, {PaletteAction, PaletteState} from "./IDE/Palette/Modules";
import ide, {IDEAction, IDEState} from "./IDE/Modules";

export default createStore(
    combineReducers({
      ide,
      edit,
      tree,
      palette,
    })
)

export type AppState = {
  ide: IDEState
  edit: EditState
  tree: TreeState
  palette: PaletteState
}

export type AppAction = Action
    | IDEAction
    | EditAction
    | TreeAction
    | PaletteAction