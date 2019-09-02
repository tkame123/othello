import {call, put, take} from "redux-saga/effects";

import {
    createPlayroomActionCreator,
    PlayRoomActionType,
    IPlayRoomActionCreator,
    IRequestGetPlayRoomAction,
} from "../action/play_room_action";
import {
    ICallbackGetPlayRoomActionItem,
} from "../action/play_room_action_item";

import {PlayRoom} from "../../domain/model/play_room";
import {createPlayRoomUseCase, IPlayRoomUseCase} from "../../domain/usecase/play_room_usecae";

const playRoomsUseCase: IPlayRoomUseCase = createPlayRoomUseCase();
const actionCreator: IPlayRoomActionCreator = createPlayroomActionCreator();

function* handleGetPlayRoomInPlayRoom() {
    while (true) {
        try {
            const action: IRequestGetPlayRoomAction = yield take(PlayRoomActionType.REQUEST_GET_PLAY_ROOM);
            const playRoom: PlayRoom = yield call(getPlayRoom, action.item.id);
            const res: ICallbackGetPlayRoomActionItem = {playRoom};
            yield put(actionCreator.callbackGetPlayRoomAction(true, res));
        } catch (error) {
            yield put(actionCreator.callbackGetPlayRoomAction(false));
        }
    }
}

const getPlayRoom = (id: string): Promise<PlayRoom | null> => {
    return playRoomsUseCase.getPlayRoom(id);
};

export {handleGetPlayRoomInPlayRoom}
