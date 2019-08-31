import {fork} from "redux-saga/effects";

import {handleCreateGameInGame, handleUpdateGameInGame, handleFinishGameInGame} from "./game_handler";

function* rootHandler() {
    yield fork(handleCreateGameInGame);
    yield fork(handleUpdateGameInGame);
    yield fork(handleFinishGameInGame);
}

export default rootHandler;
