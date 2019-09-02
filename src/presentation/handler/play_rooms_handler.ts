import {put, take, call} from "redux-saga/effects";

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

const playRoomsUseCase: IPlayRoomUseCase = createPlayRoomUseCase();
const actionCreator: IPlayRoomsActionCreator = createPlayroomsActionCreator();


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
            const playRoom: PlayRoom = yield call(createPlayRoom, action.item.owner.id);
            const res: ICallbackCreatePlayRoomActionItem = {playRoom};
            yield put(actionCreator.callbackCreatePlayRoomAction(true, res));
        } catch (error) {
            console.log(error);
            yield put(actionCreator.callbackCreatePlayRoomAction(false));
        }
    }
}

const getPlayRooms = (): Promise<PlayRoom[]> => {
    return playRoomsUseCase.getPlayRooms();
};

const createPlayRoom = (ownerId: string): Promise<PlayRoom> => {
    return playRoomsUseCase.createPlayRoom(ownerId);
};

export {handleGetPlayRoomsInPlayRooms, handleCreatePlayRoomsInPlayRooms}
