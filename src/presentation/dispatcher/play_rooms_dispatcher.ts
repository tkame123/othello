import {Action} from "redux";
import {IPlayRoomsActionCreator} from "../action/play_rooms_action";

import {
    IRequestGetPlayRoomsActionItem,
    IRequestCreatePlayRoomActionItem,
} from "../action/play_rooms_action_item"

export interface IPlayRoomsDispatcher {
    getPlayRooms(item: IRequestGetPlayRoomsActionItem): void;

    createPlayRoom(item: IRequestCreatePlayRoomActionItem): void;

}

class Dispatcher implements IPlayRoomsDispatcher {

    constructor(private dispatch: (action: Action) => void,
                private actionCreator: IPlayRoomsActionCreator) {};

    public getPlayRooms = (item: IRequestGetPlayRoomsActionItem,): void => {
        this.dispatch(this.actionCreator.requestGetPlayRoomsAction(item));};

    public createPlayRoom = (item: IRequestCreatePlayRoomActionItem,): void => {
        this.dispatch(this.actionCreator.requestCreatePlayRoomAction(item));};

}

export const createPlayRoomsDispatcher = (dispatch: (action: Action) => void, actionCreator: IPlayRoomsActionCreator): IPlayRoomsDispatcher => {
    return new Dispatcher(dispatch, actionCreator);
};
