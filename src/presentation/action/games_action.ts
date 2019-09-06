import {Action} from "redux";

import{
    IListenerOnGamesActionItem,
    IRequestInitGamesActionItem,
    IRequestFinalGamesActionItem,
    IRequestGetGamesActionItem,
    ICallbackInitGamesActionItem,
    ICallbackFinalGamesActionItem,
    ICallbackGetGamesActionItem,
} from "./games_action_item";

export enum GamesActionType {
    LISTENER_ON_GAMES = "GAMES_LISTENER_ON_GAMES",

    REQUEST_INIT_GAMES = "GAMES_REQUEST_INIT_GAMES",
    CALLBACK_INIT_GAMES = "GAMES_CALLBACK_INIT_GAMES",

    REQUEST_FINAL_GAMES = "GAMES_REQUEST_FINAL_GAMES",
    CALLBACK_FINAL_GAMES = "GAMES_CALLBACK_FINAL_GAMES",

    REQUEST_GET_GAMES = "GAMES_REQUEST_GET_GAMES",
    CALLBACK_GET_GAMES = "GAMES_CALLBACK_GET_GAMES",

}

export interface IListenerOnGamesAction extends Action {
    type: GamesActionType.LISTENER_ON_GAMES;
    isSuccess: boolean;
    item?: IListenerOnGamesActionItem;
}

export interface IRequestInitGamesAction extends Action {
    type: GamesActionType.REQUEST_INIT_GAMES;
    item: IRequestInitGamesActionItem;
}
export interface ICallbackInitGamesAction extends Action {
    type: GamesActionType.CALLBACK_INIT_GAMES;
    isSuccess: boolean;
    item?: ICallbackInitGamesActionItem;
}

export interface IRequestFinalGamesAction extends Action {
    type: GamesActionType.REQUEST_FINAL_GAMES;
    item: IRequestFinalGamesActionItem;
}
export interface ICallbackFinalGamesAction extends Action {
    type: GamesActionType.CALLBACK_FINAL_GAMES;
    isSuccess: boolean;
    item?: ICallbackFinalGamesActionItem;
}

export interface IRequestGetGamesAction extends Action {
    type: GamesActionType.REQUEST_GET_GAMES;
    item: IRequestGetGamesActionItem;
}
export interface ICallbackGetGamesAction extends Action {
    type: GamesActionType.CALLBACK_GET_GAMES;
    isSuccess: boolean;
    item?: ICallbackGetGamesActionItem;
}

export type GamesAction =
    IListenerOnGamesAction |
    IRequestInitGamesAction |
    IRequestFinalGamesAction |
    IRequestGetGamesAction |
    ICallbackInitGamesAction |
    ICallbackFinalGamesAction |
    ICallbackGetGamesAction ;

export interface IGamesActionCreator {

    listenerOnGamesAction(
        isSuccess: boolean,
        item?: IListenerOnGamesActionItem,
    ): IListenerOnGamesAction;

    requestInitGamesAction(
        item: IRequestInitGamesActionItem,
    ): IRequestInitGamesAction;
    callbackInitGamesAction(
        isSuccess: boolean,
        item?: ICallbackInitGamesActionItem,
    ): ICallbackInitGamesAction;

    requestFinalGamesAction(
        item: IRequestFinalGamesActionItem,
    ): IRequestFinalGamesAction;
    callbackFinalGamesAction(
        isSuccess: boolean,
        item?: ICallbackFinalGamesActionItem,
    ): ICallbackFinalGamesAction;

    requestGetGamesAction(
        item: IRequestGetGamesActionItem,
    ): IRequestGetGamesAction;
    callbackGetGamesAction(
        isSuccess: boolean,
        item?: ICallbackGetGamesActionItem,
    ): ICallbackGetGamesAction;

}

class ActionCreator implements IGamesActionCreator {

    public listenerOnGamesAction = (
        isSuccess: boolean,
        item?: IListenerOnGamesActionItem,
    ): IListenerOnGamesAction => {
        return {
            type: GamesActionType.LISTENER_ON_GAMES,
            isSuccess,
            item,
        };
    };

    public requestInitGamesAction = (
        item: IRequestInitGamesActionItem,
    ): IRequestInitGamesAction => {
        return {
            type: GamesActionType.REQUEST_INIT_GAMES,
            item,
        };
    };
    public callbackInitGamesAction = (
        isSuccess: boolean,
        item?: ICallbackInitGamesActionItem,
    ): ICallbackInitGamesAction => {
        return {
            type: GamesActionType.CALLBACK_INIT_GAMES,
            isSuccess,
            item,
        };
    };

    public requestFinalGamesAction = (
        item: IRequestFinalGamesActionItem,
    ): IRequestFinalGamesAction => {
        return {
            type: GamesActionType.REQUEST_FINAL_GAMES,
            item,
        };
    };
    public callbackFinalGamesAction = (
        isSuccess: boolean,
        item?: ICallbackFinalGamesActionItem,
    ): ICallbackFinalGamesAction => {
        return {
            type: GamesActionType.CALLBACK_FINAL_GAMES,
            isSuccess,
            item,
        };
    };

    public requestGetGamesAction = (
        item: IRequestGetGamesActionItem,
    ): IRequestGetGamesAction => {
        return {
            type: GamesActionType.REQUEST_GET_GAMES,
            item,
        };
    };
    public callbackGetGamesAction = (
        isSuccess: boolean,
        item?: ICallbackGetGamesActionItem,
    ): ICallbackGetGamesAction => {
        return {
            type: GamesActionType.CALLBACK_GET_GAMES,
            isSuccess,
            item,
        };
    };

}

export const createGamesActionCreator = (): IGamesActionCreator => {
    return new ActionCreator();
};
