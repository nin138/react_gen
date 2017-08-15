import * as React from 'react';
import * as ReactDOM from 'react-dom';
import createBrowserHistory from "history/createBrowserHistory";
import {Routes} from "./Routes";
import {Router} from "react-router";
import {Provider} from "react-redux";
import Store from './Store'

const history = createBrowserHistory();
ReactDOM.render(
    <Provider store={Store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
    , document.getElementById('app')
);


