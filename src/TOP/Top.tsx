import * as React from "react";
import {AppState} from "../Store";
import {Link} from "react-router-dom";
import {ComponentFile} from "../IDE/Project/Modules";
import {Map} from "immutable"
import {ActionDispatcher} from "./Container";

interface Props extends AppState {
  actions: ActionDispatcher
}

export default class Top extends React.Component<Props, {}> {
  render() {
    return (
        <section className="c-top">
            <Link to="/ide">
              <p onClick={() => this.props.actions.loadProject("test", Map({App: new ComponentFile("App")}), "App")}>ide</p>
            </Link>
        </section>
    )
  }
}