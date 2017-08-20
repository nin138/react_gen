import * as React from "react";
import {AppAction} from "../../Store";
import {addLog, LogState, LogType} from "./Modules";

export class LogActionDispatcher {
  constructor(private dispatch: (action: AppAction) => void) {}
  addLog(type: LogType, message: string) {
    const now = new Date();
    this.dispatch(addLog(type, message, `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}}`));
  }
}

interface Props {
  value: LogState
  actions: LogActionDispatcher
}

export default class Log extends React.Component<Props, {}> {
  render() {
    const logs = this.props.value.list.map(v => <div>{v!!.type}/{v!!.time}/{v!!.message}</div>);
    return (
        <section className="c-log">
          <h1>Log</h1>
          {logs}
        </section>
    )
  }
}