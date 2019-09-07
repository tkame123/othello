import {call, put, take, fork} from "redux-saga/effects";
import {push} from "connected-react-router";

import {
    createPlayroomActionCreator,
    PlayRoomActionType,
    IPlayRoomActionCreator,
    IRequestGetPlayRoomAction,
    IRequestCreateGameOnPlayRoomAction,
} from "../action/play_room_action";

import {PlayRoom} from "../../domain/model/play_room";
import {createPlayRoomUseCase, IPlayRoomUseCase} from "../../domain/usecase/play_room_usecae";
import {createGameUseCase, IGameUseCase} from "../../domain/usecase/game_usecase";
import {User} from "../../domain/model/user";
import {handleErrorForHandler} from "./handleErrorForHandler";
import {Game} from "../../domain/model/game";

const playRoomsUseCase: IPlayRoomUseCase = createPlayRoomUseCase();
const gameUseCase: IGameUseCase = createGameUseCase();
const actionCreator: IPlayRoomActionCreator = createPlayroomActionCreator();

function* handleGetPlayRoomInPlayRoom() {
    while (true) {
        try {
            const action: IRequestGetPlayRoomAction = yield take(PlayRoomActionType.REQUEST_GET_PLAY_ROOM);
            const playRoom: PlayRoom = yield call(getPlayRoom, action.item.id);
            const game: Game | null = playRoom.gameId
                ? yield call(getGame, playRoom.gameId)
                : null;
            yield put(actionCreator.callbackGetPlayRoomAction(true, {playRoom, game}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackGetPlayRoomAction(false));
        }
    }
}

function* handleCreateGameOnPlayRoomInPlayRoom() {
    while (true) {
        try {
            const action: IRequestCreateGameOnPlayRoomAction = yield take(PlayRoomActionType.REQUEST_CREATE_GAME_ON_PLAY_ROOM);
            yield call(createGameWithUpdatePlayRoom, action.item.playRoomId, action.item.boardSize, action.item.playerBlack, action.item.playerWhite);
            const playRoom: PlayRoom = yield call(getPlayRoom, action.item.playRoomId);
            const game: Game | null = playRoom.gameId
                ? yield call(getGame, playRoom.gameId)
                : null;
            yield put(actionCreator.callbackCreateGameOnPlayRoomAction(true, {playRoom, game}));
            yield put(push(`/game/${playRoom.gameId}`));

        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackCreateGameOnPlayRoomAction(false));
        }
    }
}

const getPlayRoom = (id: string): Promise<PlayRoom | null> => {
    return playRoomsUseCase.getPlayRoom(id);
};

const getGame = (id: string): Promise<Game | null> => {
    return gameUseCase.getGame(id);
};

const createGameWithUpdatePlayRoom = (playRoomId: string, boardSize: number, playerBlack: User, playerWhite: User): Promise<void> => {
    return gameUseCase.createGameWithUpdatePlayRoom(playRoomId, boardSize, playerBlack, playerWhite);
};

export {handleGetPlayRoomInPlayRoom, handleCreateGameOnPlayRoomInPlayRoom}
