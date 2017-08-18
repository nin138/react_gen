import counter, {CounterActions, CounterState} from './Counter/Modules'
import {createStore, combineReducers, Action} from 'redux'
import edit, {EditAction, EditState} from "./IDE/Edit/Modules";
import tree, {TreeAction, TreeState} from "./IDE/Tree/Modules";

export default createStore(
    combineReducers({
      counter,
      edit,
      tree
    })
)

export type GeneralState = {
  counter: CounterState
  edit: EditState
  tree: TreeState
}

export type GeneralAction = Action
  | CounterActions
  | EditAction
  | TreeAction