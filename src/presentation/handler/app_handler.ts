import {fork} from "redux-saga/effects";

import {onAuth, handleGetAuthUserInAuth, handleLoginOnGoogleInAuth, handleLogoutInAuth} from "./auth_handler";
import {handleAddInAppNotificationMessage, handleHiddenInAppNotificationMessage} from "./app_notification_message_handler";
import {onGames, handleGamesInGames} from "./games_handler";
import {handleInitGameInGame, handleUpdateGameInGame, handleFinishGameInGame} from "./game_handler";
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

    yield fork(handleAddInAppNotificationMessage);
    yield fork(handleHiddenInAppNotificationMessage);

    yield fork(handleGamesInGames);

    yield fork(handleInitGameInGame);
    yield fork(handleUpdateGameInGame);
    yield fork(handleFinishGameInGame);

    yield fork(handleGetPlayRoomInPlayRoom);
    yield fork(handleCreateGameOnPlayRoomInPlayRoom);

    yield fork(handleGetPlayRoomsInPlayRooms);
    yield fork(handleCreatePlayRoomsInPlayRooms);
}

export default rootHandler;
