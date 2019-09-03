import {fork} from "redux-saga/effects";

import {onAuth, handleGetAuthUserInAuth, handleLoginOnGoogleInAuth, handleLogoutInAuth} from "./auth_handler";
import {onGames, handleGamesInGames} from "./games_handler";
import {handleCreateGameInGame, handleUpdateGameInGame, handleFinishGameInGame} from "./game_handler";
import {handleGetPlayRoomInPlayRoom, handleCreateGameOnPlayRoomInPlayRoom} from "./play_room_handler";
import {onPlayRooms, handleGetPlayRoomsInPlayRooms, handleCreatePlayRoomsInPlayRooms} from "./play_rooms_handler";

function* rootHandler() {
    // Observe
    yield fork(onAuth);
    yield fork(onGames);
    yield fork(onPlayRooms);

    yield fork(handleGetAuthUserInAuth);
    yield fork(handleLoginOnGoogleInAuth);
    yield fork(handleLogoutInAuth);

    yield fork(handleGamesInGames);

    yield fork(handleCreateGameInGame);
    yield fork(handleUpdateGameInGame);
    yield fork(handleFinishGameInGame);

    yield fork(handleGetPlayRoomInPlayRoom);
    yield fork(handleCreateGameOnPlayRoomInPlayRoom);

    yield fork(handleGetPlayRoomsInPlayRooms);
    yield fork(handleCreatePlayRoomsInPlayRooms);
}

export default rootHandler;
