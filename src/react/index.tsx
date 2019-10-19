import { remote } from "electron";
import createHashHistory from "history/createHashHistory";
import * as path from "path";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { fileManager } from "../files/FileManager";
import { Routes } from "./Routes";
import Store from "./Store";

fileManager.setRootDir(path.join(remote.app.getPath("documents"), "ninit"));

const history = createHashHistory();

ReactDOM.render(
  <Provider store={Store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById("app")
);
