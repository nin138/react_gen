import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import Store from './Store'
import {Routes} from "./Routes";
import {Router} from "react-router";
import createBrowserHistory from "history/createBrowserHistory";

const history = createBrowserHistory();

ReactDOM.render(
    <Provider store={Store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
    , document.getElementById('app')
);

