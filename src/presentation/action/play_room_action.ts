import {Action} from "redux";

import{
    IListenerOnPlayRoomActionItem,
    IListenerOnVotesPlayRoomActionItem,
    IRequestInitPlayRoomActionItem,
    IRequestFinalPlayRoomActionItem,
    IRequestGetPlayRoomActionItem,
    IRequestCreateGameOnPlayRoomActionItem,
    IRequestUpdatePlayRoomPlayerActionItem,
    IRequestCreateVoteGameReadyActionItem,
    IRequestDeleteVoteGameReadyActionItem,
    ICallbackInitPlayRoomActionItem,
    ICallbackFinalPlayRoomActionItem,
    ICallbackGetPlayRoomActionItem,
    ICallbackCreateGameOnPlayRoomActionItem,
    ICallbackUpdatePlayRoomPlayerActionItem,
    ICallbackCreateVoteGameReadyActionItem,
    ICallbackDeleteVoteGameReadyActionItem,
} from "./play_room_action_item";

export enum PlayRoomActionType {
    LISTENER_ON_PLAY_ROOM = "PLAY_ROOM_LISTENER_ON_PLAY_ROOM",
    LISTENER_ON_VOTES_PLAY_ROOM = "PLAY_ROOM_LISTENER_ON_VOTES_PLAY_ROOM",

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

    REQUEST_CREATE_VOTE_GAME_READY = "PLAY_ROOM_REQUEST_CREATE_VOTE_GAME_READY",
    CALLBACK_CREATE_VOTE_GAME_READY = "PLAY_ROOM_CALLBACK_CREATE_VOTE_GAME_READY",

    REQUEST_DELETE_VOTE_GAME_READY = "PLAY_ROOM_REQUEST_DELETE_VOTE_GAME_READY",
    CALLBACK_DELETE_VOTE_GAME_READY = "PLAY_ROOM_CALLBACK_DELETE_VOTE_GAME_READY",

}

export interface IListenerOnPlayRoomAction extends Action {
    type: PlayRoomActionType.LISTENER_ON_PLAY_ROOM;
    isSuccess: boolean;
    item?: IListenerOnPlayRoomActionItem;
}

export interface IListenerOnVotesPlayRoomAction extends Action {
    type: PlayRoomActionType.LISTENER_ON_VOTES_PLAY_ROOM;
    isSuccess: boolean;
    item?: IListenerOnVotesPlayRoomActionItem;
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

export interface IRequestCreateVoteGameReadyAction extends Action {
    type: PlayRoomActionType.REQUEST_CREATE_VOTE_GAME_READY;
    item: IRequestCreateVoteGameReadyActionItem;
}
export interface ICallbackCreateVoteGameReadyAction extends Action {
    type: PlayRoomActionType.CALLBACK_CREATE_VOTE_GAME_READY;
    isSuccess: boolean;
    item?: ICallbackCreateVoteGameReadyActionItem;
}

export interface IRequestDeleteVoteGameReadyAction extends Action {
    type: PlayRoomActionType.REQUEST_DELETE_VOTE_GAME_READY;
    item: IRequestDeleteVoteGameReadyActionItem;
}
export interface ICallbackDeleteVoteGameReadyAction extends Action {
    type: PlayRoomActionType.CALLBACK_DELETE_VOTE_GAME_READY;
    isSuccess: boolean;
    item?: ICallbackDeleteVoteGameReadyActionItem;
}

export type PlayRoomAction =
    IListenerOnPlayRoomAction |
    IListenerOnVotesPlayRoomAction |
    IRequestInitPlayRoomAction |
    ICallbackInitPlayRoomAction |
    IRequestFinalPlayRoomAction |
    ICallbackFinalPlayRoomAction |
    IRequestGetPlayRoomAction |
    ICallbackGetPlayRoomAction |
    IRequestCreateGameOnPlayRoomAction|
    ICallbackCreateGameOnPlayRoomAction |
    IRequestUpdatePlayRoomPlayerAction |
    ICallbackUpdatePlayRoomPlayerAction |
    IRequestCreateVoteGameReadyAction |
    ICallbackCreateVoteGameReadyAction |
    IRequestDeleteVoteGameReadyAction |
    ICallbackDeleteVoteGameReadyAction;

export interface IPlayRoomActionCreator {

    listenerOnPlayRoomAction(
        isSuccess: boolean,
        item?: IListenerOnPlayRoomActionItem,
    ): IListenerOnPlayRoomAction;

    listenerOnVotesPlayRoomAction(
        isSuccess: boolean,
        item?: IListenerOnVotesPlayRoomActionItem,
    ): IListenerOnVotesPlayRoomAction;

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

    requestCreateVoteGameReadyAction(
        item: IRequestCreateVoteGameReadyActionItem,
    ): IRequestCreateVoteGameReadyAction;
    callbackCreateVoteGameReadyAction(
        isSuccess: boolean,
        item?: ICallbackCreateVoteGameReadyActionItem,
    ): ICallbackCreateVoteGameReadyAction;

    requestDeleteVoteGameReadyAction(
        item: IRequestDeleteVoteGameReadyActionItem,
    ): IRequestDeleteVoteGameReadyAction;
    callbackDeleteVoteGameReadyAction(
        isSuccess: boolean,
        item?: ICallbackDeleteVoteGameReadyActionItem,
    ): ICallbackDeleteVoteGameReadyAction;

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

    public listenerOnVotesPlayRoomAction = (
        isSuccess: boolean,
        item?: IListenerOnVotesPlayRoomActionItem,
    ): IListenerOnVotesPlayRoomAction => {
        return {
            type: PlayRoomActionType.LISTENER_ON_VOTES_PLAY_ROOM,
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

    public requestCreateVoteGameReadyAction = (
        item: IRequestCreateVoteGameReadyActionItem,
    ): IRequestCreateVoteGameReadyAction => {
        return {
            type: PlayRoomActionType.REQUEST_CREATE_VOTE_GAME_READY,
            item,
        };
    };
    public callbackCreateVoteGameReadyAction = (
        isSuccess: boolean,
        item?: ICallbackCreateVoteGameReadyActionItem,
    ): ICallbackCreateVoteGameReadyAction => {
        return {
            type: PlayRoomActionType.CALLBACK_CREATE_VOTE_GAME_READY,
            isSuccess,
            item,
        };
    };

    public requestDeleteVoteGameReadyAction = (
        item: IRequestDeleteVoteGameReadyActionItem,
    ): IRequestDeleteVoteGameReadyAction => {
        return {
            type: PlayRoomActionType.REQUEST_DELETE_VOTE_GAME_READY,
            item,
        };
    };
    public callbackDeleteVoteGameReadyAction = (
        isSuccess: boolean,
        item?: ICallbackDeleteVoteGameReadyActionItem,
    ): ICallbackDeleteVoteGameReadyAction => {
        return {
            type: PlayRoomActionType.CALLBACK_DELETE_VOTE_GAME_READY,
            isSuccess,
            item,
        };
    };

}

export const createPlayroomActionCreator = (): IPlayRoomActionCreator => {
    return new ActionCreator();
};
