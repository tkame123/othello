import {Action} from "redux";

import{
    IRequestGetPlayRoomActionItem,
    ICallbackGetPlayRoomActionItem,
} from "./play_room_action_item";

export enum PlayRoomActionType {
    REQUEST_GET_PLAY_ROOM = "PLAY_ROOM_REQUEST_GET_PLAY_ROOM",
    CALLBACK_GET_PLAY_ROOM = "PLAY_ROOM_CALLBACK_GET_PLAY_ROOM",

}

export interface IRequestGetPlayRoomAction extends Action {
    type: PlayRoomActionType.REQUEST_GET_PLAY_ROOM;
    item: IRequestGetPlayRoomActionItem;
}
export interface ICallbackGetPlayRoomAction extends Action {
    type: PlayRoomActionType.CALLBACK_GET_PLAY_ROOM;
    isSuccess: boolean;
    item?: ICallbackGetPlayRoomActionItem;
}

export type PlayRoomAction =
    IRequestGetPlayRoomAction |
    ICallbackGetPlayRoomAction ;

export interface IPlayRoomActionCreator {

    requestGetPlayRoomAction(
        item: IRequestGetPlayRoomActionItem,
    ): IRequestGetPlayRoomAction;
    callbackGetPlayRoomAction(
        isSuccess: boolean,
        item?: ICallbackGetPlayRoomActionItem,
    ): ICallbackGetPlayRoomAction;

}

class ActionCreator implements IPlayRoomActionCreator {

    public requestGetPlayRoomAction = (
        item: IRequestGetPlayRoomActionItem,
    ): IRequestGetPlayRoomAction => {
        return {
            type: PlayRoomActionType.REQUEST_GET_PLAY_ROOM,
            item,
        };
    };
    public callbackGetPlayRoomAction = (
        isSuccess: boolean,
        item?: ICallbackGetPlayRoomActionItem,
    ): ICallbackGetPlayRoomAction => {
        return {
            type: PlayRoomActionType.CALLBACK_GET_PLAY_ROOM,
            isSuccess,
            item,
        };
    };

}

export const createPlayroomActionCreator = (): IPlayRoomActionCreator => {
    return new ActionCreator();
};
