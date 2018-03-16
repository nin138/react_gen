import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import Store from './Store'
import {Routes} from "./Routes";
import {Router} from "react-router";
import createHashHistory from "history/createHashHistory";
import {fileManager} from "../files/FileManager";
import {remote} from "electron"
import * as path from "path";

fileManager.setRootDir(path.join(remote.app.getPath("documents"), "ninit"));

const history = createHashHistory();

ReactDOM.render(
    <Provider store={Store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
    , document.getElementById('app')
);

