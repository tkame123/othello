import {Action} from "redux";

import{
    IRequestGetPlayRoomsActionItem,
    IRequestCreatePlayRoomActionItem,
    ICallbackGetPlayRoomsActionItem,
    ICallbackCreatePlayRoomActionItem,
} from "./play_rooms_action_item";

export enum PlayRoomsActionType {
    REQUEST_GET_PLAY_ROOMS = "PLAY_ROOMS_REQUEST_GET_PLAY_ROOMS",
    CALLBACK_GET_PLAY_ROOMS = "PLAY_ROOMS_CALLBACK_GET_PLAY_ROOMS",

    REQUEST_CREATE_PLAY_ROOM = "PLAY_ROOMS_REQUEST_CREATE_PLAY_ROOM",
    CALLBACK_CREATE_PLAY_ROOM = "PLAY_ROOMS_CALLBACK_CREATE_PLAY_ROOM",

}

export interface IRequestGetPlayRoomsAction extends Action {
    type: PlayRoomsActionType.REQUEST_GET_PLAY_ROOMS;
    item: IRequestGetPlayRoomsActionItem;
}
export interface ICallbackGetPlayRoomsAction extends Action {
    type: PlayRoomsActionType.CALLBACK_GET_PLAY_ROOMS;
    isSuccess: boolean;
    item?: ICallbackGetPlayRoomsActionItem;
}

export interface IRequestCreatePlayRoomAction extends Action {
    type: PlayRoomsActionType.REQUEST_CREATE_PLAY_ROOM;
    item: IRequestCreatePlayRoomActionItem;
}
export interface ICallbackCreatePlayRoomAction extends Action {
    type: PlayRoomsActionType.CALLBACK_CREATE_PLAY_ROOM;
    isSuccess: boolean;
    item?: ICallbackCreatePlayRoomActionItem;
}

export type PlayRoomsAction =
    IRequestGetPlayRoomsAction |
    ICallbackGetPlayRoomsAction |
    IRequestCreatePlayRoomAction |
    ICallbackCreatePlayRoomAction ;

export interface IPlayRoomsActionCreator {

    requestGetPlayRoomsAction(
        item: IRequestGetPlayRoomsActionItem,
    ): IRequestGetPlayRoomsAction;
    callbackGetPlayRoomsAction(
        isSuccess: boolean,
        item?: ICallbackGetPlayRoomsActionItem,
    ): ICallbackGetPlayRoomsAction;

    requestCreatePlayRoomAction(
        item: IRequestCreatePlayRoomActionItem,
    ): IRequestCreatePlayRoomAction;
    callbackCreatePlayRoomAction(
        isSuccess: boolean,
        item?: ICallbackCreatePlayRoomActionItem,
    ): ICallbackCreatePlayRoomAction;

}

class ActionCreator implements IPlayRoomsActionCreator {

    public requestGetPlayRoomsAction = (
        item: IRequestGetPlayRoomsActionItem,
    ): IRequestGetPlayRoomsAction => {
        return {
            type: PlayRoomsActionType.REQUEST_GET_PLAY_ROOMS,
            item,
        };
    };
    public callbackGetPlayRoomsAction = (
        isSuccess: boolean,
        item?: ICallbackGetPlayRoomsActionItem,
    ): ICallbackGetPlayRoomsAction => {
        return {
            type: PlayRoomsActionType.CALLBACK_GET_PLAY_ROOMS,
            isSuccess,
            item,
        };
    };

    public requestCreatePlayRoomAction = (
        item: IRequestCreatePlayRoomActionItem,
    ): IRequestCreatePlayRoomAction => {
        return {
            type: PlayRoomsActionType.REQUEST_CREATE_PLAY_ROOM,
            item,
        };
    };
    public callbackCreatePlayRoomAction = (
        isSuccess: boolean,
        item?: ICallbackCreatePlayRoomActionItem,
    ): ICallbackCreatePlayRoomAction => {
        return {
            type: PlayRoomsActionType.CALLBACK_CREATE_PLAY_ROOM,
            isSuccess,
            item,
        };
    };

}

export const createPlayroomsActionCreator = (): IPlayRoomsActionCreator => {
    return new ActionCreator();
};
