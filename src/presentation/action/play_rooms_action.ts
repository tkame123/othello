import {Action} from "redux";

import{
    IListenerOnPlayRoomsActionItem,
    IRequestInitPlayRoomsActionItem,
    IRequestFinalPlayRoomsActionItem,
    IRequestGetPlayRoomsActionItem,
    IRequestCreatePlayRoomActionItem,
    ICallbackInitPlayRoomsActionItem,
    ICallbackFinalPlayRoomsActionItem,
    ICallbackGetPlayRoomsActionItem,
    ICallbackCreatePlayRoomActionItem,
} from "./play_rooms_action_item";

export enum PlayRoomsActionType {
    LISTENER_ON_PLAYROOMS = "PLAY_ROOMS_LISTENER_ON_PLAY_ROOMS",

    REQUEST_INIT_PLAY_ROOMS = "PLAY_ROOMS_REQUEST_INIT_PLAY_ROOMS",
    CALLBACK_INIT_PLAY_ROOMS = "PLAY_ROOMS_CALLBACK_INIT_PLAY_ROOMS",

    REQUEST_FINAL_PLAY_ROOMS = "PLAY_ROOMS_REQUEST_FINAL_PLAY_ROOMS",
    CALLBACK_FINAL_PLAY_ROOMS = "PLAY_ROOMS_CALLBACK_FINAL_PLAY_ROOMS",

    REQUEST_GET_PLAY_ROOMS = "PLAY_ROOMS_REQUEST_GET_PLAY_ROOMS",
    CALLBACK_GET_PLAY_ROOMS = "PLAY_ROOMS_CALLBACK_GET_PLAY_ROOMS",

    REQUEST_CREATE_PLAY_ROOM = "PLAY_ROOMS_REQUEST_CREATE_PLAY_ROOM",
    CALLBACK_CREATE_PLAY_ROOM = "PLAY_ROOMS_CALLBACK_CREATE_PLAY_ROOM",

}

export interface IListenerOnPlayRoomsAction extends Action {
    type: PlayRoomsActionType.LISTENER_ON_PLAYROOMS;
    isSuccess: boolean;
    item?: IListenerOnPlayRoomsActionItem;
}

export interface IRequestInitPlayRoomsAction extends Action {
    type: PlayRoomsActionType.REQUEST_INIT_PLAY_ROOMS;
    item: IRequestInitPlayRoomsActionItem;
}
export interface ICallbackInitPlayRoomsAction extends Action {
    type: PlayRoomsActionType.CALLBACK_INIT_PLAY_ROOMS;
    isSuccess: boolean;
    item?: ICallbackInitPlayRoomsActionItem;
}

export interface IRequestFinalPlayRoomsAction extends Action {
    type: PlayRoomsActionType.REQUEST_FINAL_PLAY_ROOMS;
    item: IRequestFinalPlayRoomsActionItem;
}
export interface ICallbackFinalPlayRoomsAction extends Action {
    type: PlayRoomsActionType.CALLBACK_FINAL_PLAY_ROOMS;
    isSuccess: boolean;
    item?: ICallbackFinalPlayRoomsActionItem;
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
    IListenerOnPlayRoomsAction |
    IRequestInitPlayRoomsAction |
    ICallbackInitPlayRoomsAction |
    IRequestFinalPlayRoomsAction |
    ICallbackFinalPlayRoomsAction |
    IRequestGetPlayRoomsAction |
    ICallbackGetPlayRoomsAction |
    IRequestCreatePlayRoomAction |
    ICallbackCreatePlayRoomAction ;

export interface IPlayRoomsActionCreator {

    listenerOnPlayRoomsAction(
        isSuccess: boolean,
        item?: IListenerOnPlayRoomsActionItem,
    ): IListenerOnPlayRoomsAction;

    requestInitPlayRoomsAction(
        item: IRequestInitPlayRoomsActionItem,
    ): IRequestInitPlayRoomsAction;
    callbackInitPlayRoomsAction(
        isSuccess: boolean,
        item?: ICallbackInitPlayRoomsActionItem,
    ): ICallbackInitPlayRoomsAction;

    requestFinalPlayRoomsAction(
        item: IRequestFinalPlayRoomsActionItem,
    ): IRequestFinalPlayRoomsAction;
    callbackFinalPlayRoomsAction(
        isSuccess: boolean,
        item?: ICallbackFinalPlayRoomsActionItem,
    ): ICallbackFinalPlayRoomsAction;

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

    public listenerOnPlayRoomsAction = (
        isSuccess: boolean,
        item?: IListenerOnPlayRoomsActionItem,
    ): IListenerOnPlayRoomsAction => {
        return {
            type: PlayRoomsActionType.LISTENER_ON_PLAYROOMS,
            isSuccess,
            item,
        };
    };

    public requestInitPlayRoomsAction = (
        item: IRequestInitPlayRoomsActionItem,
    ): IRequestInitPlayRoomsAction => {
        return {
            type: PlayRoomsActionType.REQUEST_INIT_PLAY_ROOMS,
            item,
        };
    };
    public callbackInitPlayRoomsAction = (
        isSuccess: boolean,
        item?: ICallbackInitPlayRoomsActionItem,
    ): ICallbackInitPlayRoomsAction => {
        return {
            type: PlayRoomsActionType.CALLBACK_INIT_PLAY_ROOMS,
            isSuccess,
            item,
        };
    };

    public requestFinalPlayRoomsAction = (
        item: IRequestFinalPlayRoomsActionItem,
    ): IRequestFinalPlayRoomsAction => {
        return {
            type: PlayRoomsActionType.REQUEST_FINAL_PLAY_ROOMS,
            item,
        };
    };
    public callbackFinalPlayRoomsAction = (
        isSuccess: boolean,
        item?: ICallbackFinalPlayRoomsActionItem,
    ): ICallbackFinalPlayRoomsAction => {
        return {
            type: PlayRoomsActionType.CALLBACK_FINAL_PLAY_ROOMS,
            isSuccess,
            item,
        };
    };

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
