import {fork} from "redux-saga/effects";

import {handleCreateGameInGame, handleUpdateGameInGame} from "./game_handler";

function* rootHandler() {
    yield fork(handleCreateGameInGame);
    yield fork(handleUpdateGameInGame);
}

export default rootHandler;
