import * as React from "react";
import { Route, Switch } from "react-router";
import IDE from "./IDE/Container";
import Modal from "./Modal/Container";
import NotFound from "./NotFound";
import Top from "./TOP/Container";

export class Routes extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/ide/:id" component={IDE} />
          <Route path="/" component={Top} />
          <Route component={NotFound} />
        </Switch>
        <Modal />
      </div>
    );
  }
}
