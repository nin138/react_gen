import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import Store from './Store'
import IDE from "./IDE/Container";

ReactDOM.render(
    <Provider store={Store}>
      <IDE/>
    </Provider>
    , document.getElementById('app')
);

