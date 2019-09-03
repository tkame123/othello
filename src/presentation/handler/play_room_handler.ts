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
import {createAdminPlayRoomUseCase, IAdminPlayRoomUseCase} from "../../domain/usecase/admin_play_room_usecae";
import {User} from "../../domain/model/user";
import {handleErrorForHandler} from "./handleErrorForHandler";

const playRoomsUseCase: IAdminPlayRoomUseCase = createAdminPlayRoomUseCase();
const actionCreator: IPlayRoomActionCreator = createPlayroomActionCreator();

function* handleGetPlayRoomInPlayRoom() {
    while (true) {
        try {
            const action: IRequestGetPlayRoomAction = yield take(PlayRoomActionType.REQUEST_GET_PLAY_ROOM);
            const playRoom: PlayRoom = yield call(getPlayRoom, action.item.id);
            const res: ICallbackGetPlayRoomActionItem = {playRoom};
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
            const playRoom: PlayRoom = yield call(createGameOnPlayRoom, action.item.id, action.item.playerBlack, action.item.playerWhite);
            const res: ICallbackCreateGameOnPlayRoomActionItem = {playRoom};
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

const createGameOnPlayRoom = (id: string, playerBlack: User, playerWhite: User): Promise<PlayRoom> => {
    return playRoomsUseCase.createGameOnPlayRoom(id, playerBlack, playerWhite);
};

export {handleGetPlayRoomInPlayRoom, handleCreateGameOnPlayRoomInPlayRoom}
