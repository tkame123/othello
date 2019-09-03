import {Action} from "redux";

import{
    IListenerOnGamesActionItem,
    IRequestGetGamesActionItem,
    ICallbackGetGamesActionItem,
} from "./games_action_item";

export enum GamesActionType {
    LISTENER_ON_GAMES = "GAMES_LISTENER_ON_GAMES",

    REQUEST_GET_GAMES = "GAMES_REQUEST_GET_GAMES",
    CALLBACK_GET_GAMES = "GAMES_CALLBACK_GET_GAMES",

}

export interface IListenerOnGamesAction extends Action {
    type: GamesActionType.LISTENER_ON_GAMES;
    isSuccess: boolean;
    item?: IListenerOnGamesActionItem;
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
    IRequestGetGamesAction |
    ICallbackGetGamesAction ;

export interface IGamesActionCreator {

    listenerOnGamesAction(
        isSuccess: boolean,
        item?: IListenerOnGamesActionItem,
    ): IListenerOnGamesAction;

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
