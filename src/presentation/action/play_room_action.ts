import {Action} from "redux";

import{
    IRequestGetPlayRoomActionItem,
    IRequestCreateGameOnPlayRoomActionItem,
    ICallbackGetPlayRoomActionItem,
    ICallbackCreateGameOnPlayRoomActionItem,
} from "./play_room_action_item";

export enum PlayRoomActionType {
    REQUEST_GET_PLAY_ROOM = "PLAY_ROOM_REQUEST_GET_PLAY_ROOM",
    CALLBACK_GET_PLAY_ROOM = "PLAY_ROOM_CALLBACK_GET_PLAY_ROOM",

    REQUEST_CREATE_GAME_ON_PLAY_ROOM = "PLAY_ROOM_REQUEST_CREATE_GAME",
    CALLBACK_CREATE_GAME_ON_PLAY_ROOM = "PLAY_ROOM_CALLBACK_CREATE_GAME",

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

export interface IRequestCreateGameOnPlayRoomAction extends Action {
    type: PlayRoomActionType.REQUEST_CREATE_GAME_ON_PLAY_ROOM;
    item: IRequestCreateGameOnPlayRoomActionItem;
}
export interface ICallbackCreateGameOnPlayRoomAction extends Action {
    type: PlayRoomActionType.CALLBACK_CREATE_GAME_ON_PLAY_ROOM;
    isSuccess: boolean;
    item?: ICallbackCreateGameOnPlayRoomActionItem;
}

export type PlayRoomAction =
    IRequestGetPlayRoomAction |
    ICallbackGetPlayRoomAction |
    IRequestCreateGameOnPlayRoomAction|
    ICallbackCreateGameOnPlayRoomAction ;

export interface IPlayRoomActionCreator {

    requestGetPlayRoomAction(
        item: IRequestGetPlayRoomActionItem,
    ): IRequestGetPlayRoomAction;
    callbackGetPlayRoomAction(
        isSuccess: boolean,
        item?: ICallbackGetPlayRoomActionItem,
    ): ICallbackGetPlayRoomAction;

    requestCreateGameOnPlayRoomAction(
        item: IRequestCreateGameOnPlayRoomActionItem,
    ): IRequestCreateGameOnPlayRoomAction;
    callbackCreateGameOnPlayRoomAction(
        isSuccess: boolean,
        item?: ICallbackCreateGameOnPlayRoomActionItem,
    ): ICallbackCreateGameOnPlayRoomAction;

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

    public requestCreateGameOnPlayRoomAction = (
        item: IRequestCreateGameOnPlayRoomActionItem,
    ): IRequestCreateGameOnPlayRoomAction => {
        return {
            type: PlayRoomActionType.REQUEST_CREATE_GAME_ON_PLAY_ROOM,
            item,
        };
    };
    public callbackCreateGameOnPlayRoomAction = (
        isSuccess: boolean,
        item?: ICallbackCreateGameOnPlayRoomActionItem,
    ): ICallbackCreateGameOnPlayRoomAction => {
        return {
            type: PlayRoomActionType.CALLBACK_CREATE_GAME_ON_PLAY_ROOM,
            isSuccess,
            item,
        };
    };

}

export const createPlayroomActionCreator = (): IPlayRoomActionCreator => {
    return new ActionCreator();
};
