import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {ConnectedRouter} from 'connected-react-router';
import createAppStore, { history } from "./presentation/store/app_store";

import './index.css';
import * as serviceWorker from './serviceWorker';

import {Switch} from "react-router";
import Routing from "./routing";
import NavbarContainer from "./presentation/container/navbar_container"

import firebase from 'firebase/app';

const config = {
    apiKey: "AIzaSyA-HNBbbY0JycbfOtRykX8UTpTmX263SE0",
    authDomain: "tkame123-othello.firebaseapp.com",
    databaseURL: "https://tkame123-othello.firebaseio.com",
    projectId: "tkame123-othello",
    storageBucket: "tkame123-othello.appspot.com",
    messagingSenderId: "650086036833",
    appId: "1:650086036833:web:100a41fb2683c527"
};

// Firebase Init
firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

ReactDOM.render(
    <Provider store={createAppStore()}>
        <ConnectedRouter history={history}>
            <NavbarContainer>
                <Switch>
                    <Routing/>
                </Switch>
            </NavbarContainer>
        </ConnectedRouter>
    </Provider>
    ,
    document.getElementById('root') as HTMLElement
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
