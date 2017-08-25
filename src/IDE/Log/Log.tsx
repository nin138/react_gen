import * as React from "react";
import {AppAction} from "../../Store";
import {addLog, LogState, LogType} from "./Modules";

export class LogActionDispatcher {
  constructor(private dispatch: (action: AppAction) => void) {}
  private addLog(type: LogType, message: string) {
    const now = new Date();
    this.dispatch(addLog(type, message, `${now.getHours()}:${now.getMinutes()} :${now.getSeconds()}`));
  }
  error(message: string) { this.addLog(LogType.Error, message) }
  info(message: string) { this.addLog(LogType.Info, message) }
  warning(message: string) { this.addLog(LogType.Warning, message) }

}

interface Props {
  value: LogState
  actions: LogActionDispatcher
}

export default class Log extends React.Component<Props, {}> {
  render() {
    const logs = this.props.value.list.map((v, i) => <div key={i}>{`${LogType[v!!.type]}/${v!!.time}/${v!!.message}`}</div>);
    return (
        <section className="c-log">
          <h1>Log</h1>
          {logs}
        </section>
    )
  }
}