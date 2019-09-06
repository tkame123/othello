import {fork} from "redux-saga/effects";

import {handleInitAuthUserInAuth, handleFinalAuthUserInAuth, handleGetAuthUserInAuth, handleLoginOnGoogleInAuth, handleLogoutInAuth} from "./auth_handler";
import {handleAddInAppNotificationMessage, handleHiddenInAppNotificationMessage} from "./app_notification_message_handler";
import {handleInitGamesInGames, handleFinalGamesInGames, handleGetGamesInGames} from "./games_handler";
import {handleInitGameInGame, handleFinalGameInGame, handleUpdateGameInGame, handleFinishGameInGame} from "./game_handler";
import {handleGetPlayRoomInPlayRoom, handleCreateGameOnPlayRoomInPlayRoom} from "./play_room_handler";
import {handleInitPlayRoomsInPlayRooms, handleFinalPlayRoomsInPlayRooms, handleGetPlayRoomsInPlayRooms, handleCreatePlayRoomsInPlayRooms, handleDeletePlayRoomsInPlayRooms} from "./play_rooms_handler";

function* rootHandler() {

    yield fork(handleInitAuthUserInAuth);
    yield fork(handleFinalAuthUserInAuth);
    yield fork(handleGetAuthUserInAuth);
    yield fork(handleLoginOnGoogleInAuth);
    yield fork(handleLogoutInAuth);

    yield fork(handleAddInAppNotificationMessage);
    yield fork(handleHiddenInAppNotificationMessage);

    yield fork(handleInitGamesInGames);
    yield fork(handleFinalGamesInGames);
    yield fork(handleGetGamesInGames);

    yield fork(handleInitGameInGame);
    yield fork(handleFinalGameInGame);
    yield fork(handleUpdateGameInGame);
    yield fork(handleFinishGameInGame);

    yield fork(handleGetPlayRoomInPlayRoom);
    yield fork(handleCreateGameOnPlayRoomInPlayRoom);

    yield fork(handleInitPlayRoomsInPlayRooms);
    yield fork(handleFinalPlayRoomsInPlayRooms);
    yield fork(handleGetPlayRoomsInPlayRooms);
    yield fork(handleCreatePlayRoomsInPlayRooms);
    yield fork(handleDeletePlayRoomsInPlayRooms);
}

export default rootHandler;
