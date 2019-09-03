import {Action} from "redux";

import{
    IRequestInitGameActionItem,
    IRequestUpdateGameActionItem,
    IRequestFinishGameActionItem,
    ICallbackInitGameActionItem,
    ICallbackUpdateGameActionItem,
    ICallbackFinishGameActionItem,
} from "./game_action_item";

export enum GameActionType {
    REQUEST_INIT_GAME = "GAME_REQUEST_INIT_GAME",
    CALLBACK_INIT_GAME = "GAME_CALLBACK_INIT_GAME",

    REQUEST_UPDATE_GAME = "GAME_REQUEST_UPDATE_GAME",
    CALLBACK_UPDATE_GAME = "GAME_CALLBACK_UPDATE_GAME",

    REQUEST_FINISH_GAME = "GAME_REQUEST_FINISH_GAME",
    CALLBACK_FINISH_GAME = "GAME_CALLBACK_FINISH_GAME",

}

export interface IRequestInitGameAction extends Action {
    type: GameActionType.REQUEST_INIT_GAME;
    item: IRequestInitGameActionItem;
}
export interface ICallbackInitGameAction extends Action {
    type: GameActionType.CALLBACK_INIT_GAME;
    isSuccess: boolean;
    item?: ICallbackInitGameActionItem;
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

export type GameAction =
    IRequestInitGameAction |
    ICallbackInitGameAction |
    IRequestUpdateGameAction |
    ICallbackUpdateGameAction |
    IRequestFinishGameAction |
    ICallbackFinishGameAction;

export interface IGameActionCreator {

    requestInitGameAction(
        item: IRequestInitGameActionItem,
    ): IRequestInitGameAction;
    callbackInitGameAction(
        isSuccess: boolean,
        item?: ICallbackInitGameActionItem,
    ): ICallbackInitGameAction;

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

    public requestInitGameAction = (
        item: IRequestInitGameActionItem,
    ): IRequestInitGameAction => {
        return {
            type: GameActionType.REQUEST_INIT_GAME,
            item,
        };
    };
    public callbackInitGameAction = (
        isSuccess: boolean,
        item?: ICallbackInitGameActionItem,
    ): ICallbackInitGameAction => {
        return {
            type: GameActionType.CALLBACK_INIT_GAME,
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
