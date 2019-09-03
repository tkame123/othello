import {combineReducers, Reducer} from "redux";
import {connectRouter} from 'connected-react-router';
import { History } from 'history'

import authReducer from "./auth_reducer";
import appNotificationMessageReducer from "./app_notification_message_reducer"
import gameReducer from "./game_reducer";
import gamesReducer from "./games_reducer";
import playRoomReducer from "./play_room_reducer";
import playRoomsReducer from "./play_rooms_reducer";

const appReducer: Reducer<any> = (history: History) => combineReducers<any>({
    authReducer,
    appNotificationMessageReducer,
    gameReducer,
    gamesReducer,
    playRoomReducer,
    playRoomsReducer,
    router: connectRouter(history),
});

export default appReducer;
