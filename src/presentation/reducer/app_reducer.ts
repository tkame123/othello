import {combineReducers, Reducer} from "redux";
import {connectRouter} from 'connected-react-router';
import { History } from 'history'

import gameReducer from "./game_reducer";

const appReducer: Reducer<any> = (history: History) => combineReducers<any>({
    gameReducer,
    router: connectRouter(history),
});

export default appReducer;
