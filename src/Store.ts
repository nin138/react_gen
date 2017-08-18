import counter, {CounterActions, CounterState} from './Counter/Modules'
import {createStore, combineReducers, Action} from 'redux'
import edit, {EditAction, EditState} from "./IDE/Edit/Modules";
import tree, {TreeAction, TreeState} from "./IDE/Tree/Modules";
import palette, {PaletteAction, PaletteState} from "./IDE/Palette/Modules";

export default createStore(
    combineReducers({
      counter,
      edit,
      tree,
      palette,
    })
)

export type GeneralState = {
  counter: CounterState
  edit: EditState
  tree: TreeState
  palette: PaletteState
}

export type GeneralAction = Action
  | CounterActions
  | EditAction
  | TreeAction
  | PaletteAction