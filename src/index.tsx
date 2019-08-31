import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {ConnectedRouter} from 'connected-react-router';
import createAppStore, { history } from "./presentation/store/app_store";

import './index.css';
import * as serviceWorker from './serviceWorker';

import {Routing} from "./routing";
import {Switch} from "react-router";

ReactDOM.render(
    <Provider store={createAppStore()}>
        <ConnectedRouter history={history}>
            <Switch>
                <Routing/>
            </Switch>
        </ConnectedRouter>
    </Provider>
    ,
    document.getElementById('root') as HTMLElement
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
