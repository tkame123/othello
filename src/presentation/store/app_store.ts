import {createStore, applyMiddleware, Store, StoreEnhancer} from "redux";
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import {routerMiddleware} from 'connected-react-router'

import rootReducer from "../reducer/app_reducer";
import {AppState} from "./app_state";
import rootHandler from "../handler/app_handler";

import {composeWithDevTools} from 'redux-devtools-extension';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const middleware: StoreEnhancer = applyMiddleware(
    routerMiddleware(history),
    sagaMiddleware,
);

const createAppStore = (): Store<AppState> => {
    // @ts-ignore
    const store: Store<AppState> = createStore(rootReducer(history),composeWithDevTools(middleware));
    sagaMiddleware.run(rootHandler);
    return store;
};

export default createAppStore;
