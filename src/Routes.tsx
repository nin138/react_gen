import * as React from 'react'
import {Link} from "react-router-dom";
import {Route, Switch} from "react-router";
import NotFound from "./NotFound";
import Counter from "./Counter/Container";
import Edit from "./IDE/Edit/Container";

export class Routes extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <h1>React Redux sample</h1>
        <li><Link to='/' >Home</Link></li>
        <li><Link to='/counter' >counter</Link></li>
        <li><Link to='/counter/1234' >1234</Link></li>
        <Switch>
          <Route path="/" component={Edit}/>
          <Route exact path='/counter' component={Counter} />
          <Route path='/counter/:myParams' component={Counter} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    )
  }
}
