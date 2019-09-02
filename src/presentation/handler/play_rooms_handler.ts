import {put, take, call} from "redux-saga/effects";
import {eventChannel} from 'redux-saga'

import {
    createPlayroomsActionCreator,
    PlayRoomsActionType,
    IPlayRoomsActionCreator,
    // IRequestGetPlayRoomsAction,
    IRequestCreatePlayRoomAction,
} from "../action/play_rooms_action";
import {
    ICallbackGetPlayRoomsActionItem,
    ICallbackCreatePlayRoomActionItem,
} from "../action/play_rooms_action_item";

import {PlayRoom} from "../../domain/model/play_room";
import {createPlayRoomUseCase, IPlayRoomUseCase} from "../../domain/usecase/play_room_usecae";
import {User} from "../../domain/model/user";
import {IListenerOnPlayRoomsActionItem} from "../action/play_rooms_action_item";

const playRoomsUseCase: IPlayRoomUseCase = createPlayRoomUseCase();
const actionCreator: IPlayRoomsActionCreator = createPlayroomsActionCreator();

const playRoomsChannel = () => {
    const channel = eventChannel(emit => {
        playRoomsUseCase.onPlayRooms((playRooms: PlayRoom[]) =>{
            emit({playRooms})
        });

        const unsubscribe = () => {};

        return unsubscribe
    });
    return channel
};

function* onPlayRooms() {
    const channel = yield call(playRoomsChannel);
    while (true) {
        try {
            const { playRooms } = yield take(channel);
            const res: IListenerOnPlayRoomsActionItem = {playRooms};
            yield put(actionCreator.listenerOnPlayRoomsAction(true, res));
        } catch (error) {
            yield put(actionCreator.listenerOnPlayRoomsAction(false));
        }
    }
}

function* handleGetPlayRoomsInPlayRooms() {
    while (true) {
        try {
            yield take(PlayRoomsActionType.REQUEST_GET_PLAY_ROOMS);
            const playRooms: PlayRoom[] = yield call(getPlayRooms);
            const res: ICallbackGetPlayRoomsActionItem = {playRooms};
            yield put(actionCreator.callbackGetPlayRoomsAction(true, res));
        } catch (error) {
            yield put(actionCreator.callbackGetPlayRoomsAction(false));
        }
    }
}

function* handleCreatePlayRoomsInPlayRooms() {
    while (true) {
        try {
            const action: IRequestCreatePlayRoomAction = yield take(PlayRoomsActionType.REQUEST_CREATE_PLAY_ROOM);
            yield call(createPlayRoom, action.item.owner);
            const res: ICallbackCreatePlayRoomActionItem = {};
            yield put(actionCreator.callbackCreatePlayRoomAction(true, res));
        } catch (error) {
            yield put(actionCreator.callbackCreatePlayRoomAction(false));
        }
    }
}

const getPlayRooms = (): Promise<PlayRoom[]> => {
    return playRoomsUseCase.getPlayRooms();
};

const createPlayRoom = (owner: User): Promise<void> => {
    return playRoomsUseCase.createPlayRoom(owner);
};

export {onPlayRooms, handleGetPlayRoomsInPlayRooms, handleCreatePlayRoomsInPlayRooms}
