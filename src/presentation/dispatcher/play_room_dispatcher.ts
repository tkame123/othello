import {Action} from "redux";
import {IPlayRoomActionCreator} from "../action/play_room_action";

import {
    IRequestGetPlayRoomActionItem,
} from "../action/play_room_action_item"

export interface IPlayRoomDispatcher {

    getPlayRoom(item: IRequestGetPlayRoomActionItem): void;

}

class Dispatcher implements IPlayRoomDispatcher {

    constructor(private dispatch: (action: Action) => void,
                private actionCreator: IPlayRoomActionCreator) {};

    public getPlayRoom = (item: IRequestGetPlayRoomActionItem,): void => {
        this.dispatch(this.actionCreator.requestGetPlayRoomAction(item));};

}

export const createPlayRoomDispatcher = (dispatch: (action: Action) => void, actionCreator: IPlayRoomActionCreator): IPlayRoomDispatcher => {
    return new Dispatcher(dispatch, actionCreator);
};
