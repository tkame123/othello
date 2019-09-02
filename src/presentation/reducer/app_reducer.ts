import {combineReducers, Reducer} from "redux";
import {connectRouter} from 'connected-react-router';
import { History } from 'history'

import authReducer from "./auth_reducer";
import gameReducer from "./game_reducer";
import playRoomReducer from "./play_room_reducer";
import playRoomsReducer from "./play_rooms_reducer";

const appReducer: Reducer<any> = (history: History) => combineReducers<any>({
    authReducer,
    gameReducer,
    playRoomReducer,
    playRoomsReducer,
    router: connectRouter(history),
});

export default appReducer;
