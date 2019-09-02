import {put, take} from "redux-saga/effects";

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
import {User} from "../../domain/model/user";

const actionCreator: IPlayRoomActionCreator = createPlayroomActionCreator();

function* handleGetPlayRoomInPlayRoom() {
    while (true) {
        try {
            const action: IRequestGetPlayRoomAction = yield take(PlayRoomActionType.REQUEST_GET_PLAY_ROOM);
            // Todo: 仮実装
            console.log(action.item.id);
            const playRoom: PlayRoom = PlayRoom.New(User.New("test@local"));
            const res: ICallbackGetPlayRoomActionItem = {playRoom};
            yield put(actionCreator.callbackGetPlayRoomAction(true, res));
        } catch (error) {
            yield put(actionCreator.callbackGetPlayRoomAction(false));
        }
    }
}

export {handleGetPlayRoomInPlayRoom}
