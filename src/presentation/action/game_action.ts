import {Action} from "redux";

import{
    IRequestCreateGameActionItem,
    IRequestUpdateGameActionItem,
    IRequestFinishGameActionItem,
} from "./game_action_item";

import{
    ICallbackCreateGameActionItem,
    ICallbackUpdateGameActionItem,
    ICallbackFinishGameActionItem,
} from "./game_action_item";

export enum GameActionType {
    REQUEST_CREATE_GAME = "GAME_REQUEST_CREATE_GAME",
    CALLBACK_CREATE_GAME = "GAME_CALLBACK_CREATE_GAME",

    REQUEST_UPDATE_GAME = "GAME_REQUEST_UPDATE_GAME",
    CALLBACK_UPDATE_GAME = "GAME_CALLBACK_UPDATE_GAME",

    REQUEST_FINISH_GAME = "GAME_REQUEST_FINISH_GAME",
    CALLBACK_FINISH_GAME = "GAME_CALLBACK_FINISH_GAME",

}

export interface IRequestCreateGameAction extends Action {
    type: GameActionType.REQUEST_CREATE_GAME;
    item: IRequestCreateGameActionItem;
}
export interface ICallbackCreateGameAction extends Action {
    type: GameActionType.CALLBACK_CREATE_GAME;
    isSuccess: boolean;
    item?: ICallbackCreateGameActionItem;
}

export interface IRequestUpdateGameAction extends Action {
    type: GameActionType.REQUEST_UPDATE_GAME;
    item: IRequestUpdateGameActionItem;
}
export interface ICallbackUpdateGameAction extends Action {
    type: GameActionType.CALLBACK_UPDATE_GAME;
    isSuccess: boolean;
    item?: ICallbackUpdateGameActionItem;
}

export interface IRequestFinishGameAction extends Action {
    type: GameActionType.REQUEST_FINISH_GAME;
    item: IRequestFinishGameActionItem;
}
export interface ICallbackFinishGameAction extends Action {
    type: GameActionType.CALLBACK_FINISH_GAME;
    isSuccess: boolean;
    item?: ICallbackFinishGameActionItem;
}

export type GameDetailAction =
    IRequestCreateGameAction |
    ICallbackCreateGameAction |
    IRequestUpdateGameAction |
    ICallbackUpdateGameAction |
    IRequestFinishGameAction |
    ICallbackFinishGameAction;

export interface IGameActionCreator {

    requestCreateGameAction(
        item: IRequestCreateGameActionItem,
    ): IRequestCreateGameAction;
    callbackCreateGameAction(
        isSuccess: boolean,
        item?: ICallbackCreateGameActionItem,
    ): ICallbackCreateGameAction;

    requestUpdateGameAction(
        item: IRequestUpdateGameActionItem,
    ): IRequestUpdateGameAction;
    callbackUpdateGameAction(
        isSuccess: boolean,
        item?: ICallbackUpdateGameActionItem,
    ): ICallbackUpdateGameAction;

    requestFinishGameAction(
        item: IRequestFinishGameActionItem,
    ): IRequestFinishGameAction;
    callbackFinishGameAction(
        isSuccess: boolean,
        item?: ICallbackFinishGameActionItem,
    ): ICallbackFinishGameAction;

}

class ActionCreator implements IGameActionCreator {

    public requestCreateGameAction = (
        item: IRequestCreateGameActionItem,
    ): IRequestCreateGameAction => {
        return {
            type: GameActionType.REQUEST_CREATE_GAME,
            item,
        };
    };
    public callbackCreateGameAction = (
        isSuccess: boolean,
        item?: ICallbackCreateGameActionItem,
    ): ICallbackCreateGameAction => {
        return {
            type: GameActionType.CALLBACK_CREATE_GAME,
            isSuccess,
            item,
        };
    };

    public requestUpdateGameAction = (
        item: IRequestUpdateGameActionItem,
    ): IRequestUpdateGameAction => {
        return {
            type: GameActionType.REQUEST_UPDATE_GAME,
            item,
        };
    };
    public callbackUpdateGameAction = (
        isSuccess: boolean,
        item?: ICallbackUpdateGameActionItem,
    ): ICallbackUpdateGameAction => {
        return {
            type: GameActionType.CALLBACK_UPDATE_GAME,
            isSuccess,
            item,
        };
    };

    public requestFinishGameAction = (
        item: IRequestFinishGameActionItem,
    ): IRequestFinishGameAction => {
        return {
            type: GameActionType.REQUEST_FINISH_GAME,
            item,
        };
    };
    public callbackFinishGameAction = (
        isSuccess: boolean,
        item?: ICallbackFinishGameActionItem,
    ): ICallbackFinishGameAction => {
        return {
            type: GameActionType.CALLBACK_FINISH_GAME,
            isSuccess,
            item,
        };
    };

}

export const createGameActionCreator = (): IGameActionCreator => {
    return new ActionCreator();
};
