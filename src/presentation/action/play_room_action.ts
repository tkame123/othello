import {Action} from "redux";

import{
    IListenerOnPlayRoomActionItem,
    IRequestInitPlayRoomActionItem,
    IRequestFinalPlayRoomActionItem,
    IRequestGetPlayRoomActionItem,
    IRequestCreateGameOnPlayRoomActionItem,
    IRequestUpdatePlayRoomPlayerActionItem,
    ICallbackInitPlayRoomActionItem,
    ICallbackFinalPlayRoomActionItem,
    ICallbackGetPlayRoomActionItem,
    ICallbackCreateGameOnPlayRoomActionItem,
    ICallbackUpdatePlayRoomPlayerActionItem,
} from "./play_room_action_item";

export enum PlayRoomActionType {
    LISTENER_ON_PLAY_ROOM = "PLAY_ROOM_LISTENER_ON_PLAY_ROOM",

    REQUEST_INIT_PLAY_ROOM = "PLAY_ROOM_REQUEST_INIT_PLAY_ROOM",
    CALLBACK_INIT_PLAY_ROOM = "PLAY_ROOM_CALLBACK_INIT_PLAY_ROOM",

    REQUEST_FINAL_PLAY_ROOM = "PLAY_ROOM_REQUEST_FINAL_PLAY_ROOM",
    CALLBACK_FINAL_PLAY_ROOM = "PLAY_ROOM_CALLBACK_FINAL_PLAY_ROOM",

    REQUEST_GET_PLAY_ROOM = "PLAY_ROOM_REQUEST_GET_PLAY_ROOM",
    CALLBACK_GET_PLAY_ROOM = "PLAY_ROOM_CALLBACK_GET_PLAY_ROOM",

    REQUEST_CREATE_GAME_ON_PLAY_ROOM = "PLAY_ROOM_REQUEST_CREATE_GAME",
    CALLBACK_CREATE_GAME_ON_PLAY_ROOM = "PLAY_ROOM_CALLBACK_CREATE_GAME",

    REQUEST_UPDATE_PLAY_ROOM_PLAYER = "PLAY_ROOM_REQUEST_UPDATE_PLAY_ROOM_PLAYER",
    CALLBACK_UPDATE_PLAY_ROOM_PLAYER = "PLAY_ROOM_CALLBACK_UPDATE_PLAY_ROOM_PLAYER",

}

export interface IListenerOnPlayRoomAction extends Action {
    type: PlayRoomActionType.LISTENER_ON_PLAY_ROOM;
    isSuccess: boolean;
    item?: IListenerOnPlayRoomActionItem;
}

export interface IRequestInitPlayRoomAction extends Action {
    type: PlayRoomActionType.REQUEST_INIT_PLAY_ROOM;
    item: IRequestInitPlayRoomActionItem;
}
export interface ICallbackInitPlayRoomAction extends Action {
    type: PlayRoomActionType.CALLBACK_INIT_PLAY_ROOM;
    isSuccess: boolean;
    item?: ICallbackInitPlayRoomActionItem;
}

export interface IRequestFinalPlayRoomAction extends Action {
    type: PlayRoomActionType.REQUEST_FINAL_PLAY_ROOM;
    item: IRequestFinalPlayRoomActionItem;
}
export interface ICallbackFinalPlayRoomAction extends Action {
    type: PlayRoomActionType.CALLBACK_FINAL_PLAY_ROOM;
    isSuccess: boolean;
    item?: ICallbackFinalPlayRoomActionItem;
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

export interface IRequestUpdatePlayRoomPlayerAction extends Action {
    type: PlayRoomActionType.REQUEST_UPDATE_PLAY_ROOM_PLAYER;
    item: IRequestUpdatePlayRoomPlayerActionItem;
}
export interface ICallbackUpdatePlayRoomPlayerAction extends Action {
    type: PlayRoomActionType.CALLBACK_UPDATE_PLAY_ROOM_PLAYER;
    isSuccess: boolean;
    item?: ICallbackUpdatePlayRoomPlayerActionItem;
}

export type PlayRoomAction =
    IListenerOnPlayRoomAction |
    IRequestInitPlayRoomAction |
    ICallbackInitPlayRoomAction |
    IRequestFinalPlayRoomAction |
    ICallbackFinalPlayRoomAction |
    IRequestGetPlayRoomAction |
    ICallbackGetPlayRoomAction |
    IRequestCreateGameOnPlayRoomAction|
    ICallbackCreateGameOnPlayRoomAction |
    IRequestUpdatePlayRoomPlayerAction |
    ICallbackUpdatePlayRoomPlayerAction;

export interface IPlayRoomActionCreator {

    listenerOnPlayRoomAction(
        isSuccess: boolean,
        item?: IListenerOnPlayRoomActionItem,
    ): IListenerOnPlayRoomAction;

    requestInitPlayRoomAction(
        item: IRequestInitPlayRoomActionItem,
    ): IRequestInitPlayRoomAction;
    callbackInitPlayRoomAction(
        isSuccess: boolean,
        item?: ICallbackInitPlayRoomActionItem,
    ): ICallbackInitPlayRoomAction;

    requestFinalPlayRoomAction(
        item: IRequestFinalPlayRoomActionItem,
    ): IRequestFinalPlayRoomAction;
    callbackFinalPlayRoomAction(
        isSuccess: boolean,
        item?: ICallbackFinalPlayRoomActionItem,
    ): ICallbackFinalPlayRoomAction;

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

    requestUpdatePlayRoomPlayerAction(
        item: IRequestUpdatePlayRoomPlayerActionItem,
    ): IRequestUpdatePlayRoomPlayerAction;
    callbackUpdatePlayRoomPlayerAction(
        isSuccess: boolean,
        item?: ICallbackUpdatePlayRoomPlayerActionItem,
    ): ICallbackUpdatePlayRoomPlayerAction;

}

class ActionCreator implements IPlayRoomActionCreator {

    public listenerOnPlayRoomAction = (
        isSuccess: boolean,
        item?: IListenerOnPlayRoomActionItem,
    ): IListenerOnPlayRoomAction => {
        return {
            type: PlayRoomActionType.LISTENER_ON_PLAY_ROOM,
            isSuccess,
            item,
        };
    };

    public requestInitPlayRoomAction = (
        item: IRequestInitPlayRoomActionItem,
    ): IRequestInitPlayRoomAction => {
        return {
            type: PlayRoomActionType.REQUEST_INIT_PLAY_ROOM,
            item,
        };
    };
    public callbackInitPlayRoomAction = (
        isSuccess: boolean,
        item?: ICallbackInitPlayRoomActionItem,
    ): ICallbackInitPlayRoomAction => {
        return {
            type: PlayRoomActionType.CALLBACK_INIT_PLAY_ROOM,
            isSuccess,
            item,
        };
    };

    public requestFinalPlayRoomAction = (
        item: IRequestFinalPlayRoomActionItem,
    ): IRequestFinalPlayRoomAction => {
        return {
            type: PlayRoomActionType.REQUEST_FINAL_PLAY_ROOM,
            item,
        };
    };
    public callbackFinalPlayRoomAction = (
        isSuccess: boolean,
        item?: ICallbackFinalPlayRoomActionItem,
    ): ICallbackFinalPlayRoomAction => {
        return {
            type: PlayRoomActionType.CALLBACK_FINAL_PLAY_ROOM,
            isSuccess,
            item,
        };
    };

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

    public requestUpdatePlayRoomPlayerAction = (
        item: IRequestUpdatePlayRoomPlayerActionItem,
    ): IRequestUpdatePlayRoomPlayerAction => {
        return {
            type: PlayRoomActionType.REQUEST_UPDATE_PLAY_ROOM_PLAYER,
            item,
        };
    };
    public callbackUpdatePlayRoomPlayerAction = (
        isSuccess: boolean,
        item?: ICallbackUpdatePlayRoomPlayerActionItem,
    ): ICallbackUpdatePlayRoomPlayerAction => {
        return {
            type: PlayRoomActionType.CALLBACK_UPDATE_PLAY_ROOM_PLAYER,
            isSuccess,
            item,
        };
    };

}

export const createPlayroomActionCreator = (): IPlayRoomActionCreator => {
    return new ActionCreator();
};
