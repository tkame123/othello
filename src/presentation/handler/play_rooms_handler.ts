import {put, take, call, fork, cancelled, cancel} from "redux-saga/effects";
import {eventChannel, Task} from 'redux-saga'

import {
    createPlayroomsActionCreator,
    PlayRoomsActionType,
    IPlayRoomsActionCreator,
    IRequestCreatePlayRoomAction,
    IRequestDeletePlayRoomAction,
} from "../action/play_rooms_action";

import {PlayRoom} from "../../domain/model/play_room";
import {createPlayRoomUseCase, IPlayRoomUseCase} from "../../domain/usecase/play_room_usecae";
import {createGameUseCase, IGameUseCase} from "../../domain/usecase/game_usecase";
import {User} from "../../domain/model/user";
import {handleErrorForHandler} from "./handleErrorForHandler";
import {Game} from "../../domain/model/game";

const playRoomsUseCase: IPlayRoomUseCase = createPlayRoomUseCase();
const gameUseCase: IGameUseCase = createGameUseCase();
const actionCreator: IPlayRoomsActionCreator = createPlayroomsActionCreator();

let playRoomsChannelTask: Task;

const playRoomsChannel = () => {
    const channel = eventChannel(emit => {
        playRoomsUseCase.onPlayRooms((playRooms: PlayRoom[]) =>{
            emit({playRooms})
        });

        const unsubscribe = () => {
            playRoomsUseCase.offPlayrooms();
        };

        return unsubscribe
    });
    return channel
};

function* onPlayRooms() {
    const channel = yield call(playRoomsChannel);
    while (true) {
        try {
            const { playRooms } = yield take(channel);
            let games: Game[] = [];
            for (const playRoom of playRooms) {
                if (playRoom.gameId) {
                    games.push(yield call(getGame, playRoom.gameId));
                }
            }
            yield put(actionCreator.listenerOnPlayRoomsAction(true, {playRooms, games}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.listenerOnPlayRoomsAction(false));
        } finally {
            if (yield cancelled()) {
                channel.close();
            }
        }
    }
}

function* handleInitPlayRoomsInPlayRooms() {
    while (true) {
        try {
            yield take(PlayRoomsActionType.REQUEST_INIT_PLAY_ROOMS);
            playRoomsChannelTask = yield fork(onPlayRooms);
            yield put(actionCreator.callbackInitPlayRoomsAction(true, {}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackInitPlayRoomsAction(false));
        }
    }
}

function* handleFinalPlayRoomsInPlayRooms() {
    while (true) {
        try {
            yield take(PlayRoomsActionType.REQUEST_FINAL_PLAY_ROOMS);
            yield cancel(playRoomsChannelTask);
            yield put(actionCreator.callbackFinalPlayRoomsAction(true, {}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackFinalPlayRoomsAction(false));
        }
    }
}

function* handleGetPlayRoomsInPlayRooms() {
    while (true) {
        try {
            yield take(PlayRoomsActionType.REQUEST_GET_PLAY_ROOMS);
            const playRooms: PlayRoom[] = yield call(getPlayRooms);
            let games: Game[] = [];
            for (const playRoom of playRooms) {
                if (playRoom.gameId) {
                    games.push(yield call(getGame, playRoom.gameId));
                }
            }
            yield put(actionCreator.callbackGetPlayRoomsAction(true, {playRooms, games}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackGetPlayRoomsAction(false));
        }
    }
}

function* handleCreatePlayRoomsInPlayRooms() {
    while (true) {
        try {
            const action: IRequestCreatePlayRoomAction = yield take(PlayRoomsActionType.REQUEST_CREATE_PLAY_ROOM);
            yield call(createPlayRoom, action.item.owner);
            yield put(actionCreator.callbackCreatePlayRoomAction(true, {}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackCreatePlayRoomAction(false));
        }
    }
}

function* handleDeletePlayRoomsInPlayRooms() {
    while (true) {
        try {
            const action: IRequestDeletePlayRoomAction = yield take(PlayRoomsActionType.REQUEST_DELETE_PLAY_ROOMS);
            for (const playRoom of action.item.playRooms) {
                yield call(deletePlayRooms, playRoom.id);
            }
            yield put(actionCreator.callbackDeletePlayRoomAction(true, {}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackDeletePlayRoomAction(false));
        }
    }
}

const getPlayRooms = (): Promise<PlayRoom[]> => {
    return playRoomsUseCase.getPlayRooms();
};

const createPlayRoom = (owner: User): Promise<void> => {
    return playRoomsUseCase.createPlayRoom(owner);
};

const deletePlayRooms = (id: string): Promise<void> => {
    return playRoomsUseCase.deletePlayRoom(id);
};

const getGame = (id: string): Promise<Game | null> => {
    return gameUseCase.getGame(id);
};

export {handleInitPlayRoomsInPlayRooms, handleFinalPlayRoomsInPlayRooms, handleGetPlayRoomsInPlayRooms, handleCreatePlayRoomsInPlayRooms, handleDeletePlayRoomsInPlayRooms}
