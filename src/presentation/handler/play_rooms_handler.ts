import {put, take, call, fork, cancelled, cancel} from "redux-saga/effects";
import {eventChannel, Task} from 'redux-saga'

import {
    createPlayroomsActionCreator,
    PlayRoomsActionType,
    IPlayRoomsActionCreator,
    IRequestDeletePlayRoomAction,
} from "../action/play_rooms_action";

import {PlayRoom} from "../../domain/model/play_room";
import {createPlayRoomUseCase, IPlayRoomUseCase} from "../../domain/usecase/play_room_usecae";
import {handleErrorForHandler} from "./handleErrorForHandler";

const playRoomsUseCase: IPlayRoomUseCase = createPlayRoomUseCase();
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
            yield put(actionCreator.listenerOnPlayRoomsAction(true, {playRooms}));
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
            yield put(actionCreator.callbackGetPlayRoomsAction(true, {playRooms}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackGetPlayRoomsAction(false));
        }
    }
}

function* handleCreatePlayRoomsInPlayRooms() {
    while (true) {
        try {
            yield take(PlayRoomsActionType.REQUEST_CREATE_PLAY_ROOM);
            yield call(createPlayRoom);
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

const createPlayRoom = (): Promise<void> => {
    return playRoomsUseCase.createPlayRoom();
};

const deletePlayRooms = (id: string): Promise<void> => {
    return playRoomsUseCase.deletePlayRoom(id);
};

export {handleInitPlayRoomsInPlayRooms, handleFinalPlayRoomsInPlayRooms, handleGetPlayRoomsInPlayRooms, handleCreatePlayRoomsInPlayRooms, handleDeletePlayRoomsInPlayRooms}
