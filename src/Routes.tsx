import * as React from 'react'
import {Link} from "react-router-dom";
import {Route, Switch} from "react-router";
import NotFound from "./NotFound";
import IDE from "./IDE/IDE";

export class Routes extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <h1>React Redux sample</h1>
        <li><Link to='/' >Home</Link></li>
        <Switch>
          <Route path="/" component={IDE}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    )
  }
}
