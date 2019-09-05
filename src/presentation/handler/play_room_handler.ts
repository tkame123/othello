import {call, put, take, fork} from "redux-saga/effects";

import {
    createPlayroomActionCreator,
    PlayRoomActionType,
    IPlayRoomActionCreator,
    IRequestGetPlayRoomAction,
    IRequestCreateGameOnPlayRoomAction,
} from "../action/play_room_action";
import {
    ICallbackGetPlayRoomActionItem,
    ICallbackCreateGameOnPlayRoomActionItem,
} from "../action/play_room_action_item";

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
            const res: ICallbackGetPlayRoomActionItem = {playRoom, game};
            yield put(actionCreator.callbackGetPlayRoomAction(true, res));
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
            const playRoom: PlayRoom = yield call(createGameOnPlayRoom, action.item.id, action.item.boardSize, action.item.playerBlack, action.item.playerWhite);
            const game: Game | null = playRoom.gameId
                ? yield call(getGame, playRoom.gameId)
                : null;
            const res: ICallbackCreateGameOnPlayRoomActionItem = {playRoom, game};
            yield put(actionCreator.callbackCreateGameOnPlayRoomAction(true, res));
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

const createGameOnPlayRoom = (id: string, boardSize: number, playerBlack: User, playerWhite: User): Promise<PlayRoom> => {
    return playRoomsUseCase.createGameOnPlayRoom(id, boardSize, playerBlack, playerWhite);
};

export {handleGetPlayRoomInPlayRoom, handleCreateGameOnPlayRoomInPlayRoom}
