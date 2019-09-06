import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {ConnectedRouter} from 'connected-react-router';
import createAppStore, { history } from "./presentation/store/app_store";

import './index.css';
import * as serviceWorker from './serviceWorker';

import {config} from "./util/config";
import firebase from 'firebase/app';

import Routing from "./routing";
import ErrorBoundary from "./error_boundary";
import HeaderContainer from "./presentation/container/header_container";

const firebaseConfig = {
    apiKey: config().firebase.apiKey,
    authDomain: config().firebase.authDomain,
    databaseURL: config().firebase.databaseURL,
    projectId: config().firebase.projectId,
    storageBucket: config().firebase.storageBucket,
    messagingSenderId: config().firebase.messagingSenderId,
    appId: config().firebase.appId,
};

// Firebase Init
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

ReactDOM.render(
    <Provider store={createAppStore()}>
        <ConnectedRouter history={history}>
            <HeaderContainer>
                <ErrorBoundary>
                    <Routing/>
                </ErrorBoundary>
            </HeaderContainer>
        </ConnectedRouter>
    </Provider>
    ,
    document.getElementById('root') as HTMLElement
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
