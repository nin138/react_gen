import * as React from "react";
import {AppState} from "../Store";
import {ActionDispatcher} from "../IDE/Container";
import {Link} from "react-router-dom";

interface Props extends AppState {
  actions: ActionDispatcher
}

export default class Top extends React.Component<Props, {}> {
  render() {
    return (
        <section className="c-top">
            <Link to="/ide">
              <p onClick={() => alert("a")}>ide</p>
            </Link>
        </section>
    )
  }
}