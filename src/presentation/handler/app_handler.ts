import {fork} from "redux-saga/effects";

import {onAuth, handleGetAuthUserInAuth, handleLoginOnGoogleInAuth, handleLogoutInAuth} from "./auth_handler";
import {handleCreateGameInGame, handleUpdateGameInGame, handleFinishGameInGame} from "./game_handler";
import {handleGetPlayRoomInPlayRoom} from "./play_room_handler";
import {handleGetPlayRoomsInPlayRooms, handleCreatePlayRoomsInPlayRooms} from "./play_rooms_handler";

function* rootHandler() {
    yield fork(onAuth);

    yield fork(handleGetAuthUserInAuth);
    yield fork(handleLoginOnGoogleInAuth);
    yield fork(handleLogoutInAuth);

    yield fork(handleCreateGameInGame);
    yield fork(handleUpdateGameInGame);
    yield fork(handleFinishGameInGame);

    yield fork(handleGetPlayRoomInPlayRoom);

    yield fork(handleGetPlayRoomsInPlayRooms);
    yield fork(handleCreatePlayRoomsInPlayRooms);
}

export default rootHandler;
