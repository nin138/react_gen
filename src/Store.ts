import counter, {CounterActions, CounterState} from './Counter/Modules'
import {createStore, combineReducers, Action} from 'redux'
import edit, {EditAction, EditState} from "./Edit/Modules";

export default createStore(
    combineReducers({
      counter,
      edit
    })
)

export type GeneralState = {
  counter: CounterState
  edit: EditState
}

export type GeneralAction = Action
  | CounterActions
  | EditAction