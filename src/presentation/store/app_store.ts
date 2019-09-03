import {createStore, applyMiddleware, Store, StoreEnhancer} from "redux";
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import {routerMiddleware} from 'connected-react-router'

import rootReducer from "../reducer/app_reducer";
import {AppState} from "./app_state";
import rootHandler from "../handler/app_handler";

import {composeWithDevTools} from 'redux-devtools-extension';
import * as Sentry from '@sentry/browser';
import createSentryMiddleware from "redux-sentry-middleware";

import {config} from "../../util/config"

export const history = createBrowserHistory();

Sentry.init({
    dsn: config().sentry.sentryDsn,
    environment: process.env.NODE_ENV,
});
Sentry.setTag("app", "othello");

const sentryMiddleware = createSentryMiddleware(Sentry, {
    breadcrumbDataFromAction: (action: any) => {
        if (action.item) {
            // 自作のActionのPayloadを出力する
            return { payload: action.item };
        }
        return undefined;

    },
    filterBreadcrumbActions: (action: any) => {
        const filterList: string[] = [
            "@@redux-form/CHANGE"
        ];
        return !filterList.includes(action.type);
    }
});

const sagaMiddleware = createSagaMiddleware();
const middleware: StoreEnhancer = applyMiddleware(
    routerMiddleware(history),
    sagaMiddleware,
    sentryMiddleware,
);

const createAppStore = (): Store<AppState> => {
    // @ts-ignore
    const store: Store<AppState> = createStore(rootReducer(history),composeWithDevTools(middleware));
    sagaMiddleware.run(rootHandler);
    return store;
};

export default createAppStore;
