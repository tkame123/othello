import {Action} from "redux";
import {IPlayRoomActionCreator} from "../action/play_room_action";

import {
    IRequestGetPlayRoomActionItem,
    IRequestCreateGameOnPlayRoomActionItem,
} from "../action/play_room_action_item"

export interface IPlayRoomDispatcher {

    getPlayRoom(item: IRequestGetPlayRoomActionItem): void;

    createGameOnPlayRoom(item: IRequestCreateGameOnPlayRoomActionItem): void;

}

class Dispatcher implements IPlayRoomDispatcher {

    constructor(private dispatch: (action: Action) => void,
                private actionCreator: IPlayRoomActionCreator) {};

    public getPlayRoom = (item: IRequestGetPlayRoomActionItem,): void => {
        this.dispatch(this.actionCreator.requestGetPlayRoomAction(item));};

    public createGameOnPlayRoom = (item: IRequestCreateGameOnPlayRoomActionItem,): void => {
        this.dispatch(this.actionCreator.requestCreateGameOnPlayRoomAction(item));};

}

export const createPlayRoomDispatcher = (dispatch: (action: Action) => void, actionCreator: IPlayRoomActionCreator): IPlayRoomDispatcher => {
    return new Dispatcher(dispatch, actionCreator);
};
