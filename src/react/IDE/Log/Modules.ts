import {Action} from 'redux'
import {List} from "immutable";

enum ActionNames {
  AddLog = "Log.AddLog"
}
export enum LogType {
  Error, Info, Warning
}

interface AddLogAction extends Action {
  type: ActionNames.AddLog
  logType: LogType
  message: string
  time: string
}
export const addLog = (type: LogType, message: string, time: string): AddLogAction => ({
  type: ActionNames.AddLog,
  logType: type,
  message,
  time
});

export interface LogData {
  type: LogType,
  message: string,
  time: string
}

export interface LogState {
  list: List<LogData>
}

export type LogAction = AddLogAction

const initialState: LogState= {
  list: List()
};

export default function reducer(state: LogState = initialState, action: LogAction): LogState {
  switch (action.type) {
    case ActionNames.AddLog:
      return Object.assign({}, state, {list: state.list.push({type: action.logType, message: action.message, time: action.time})});
    default: return state
  }
}