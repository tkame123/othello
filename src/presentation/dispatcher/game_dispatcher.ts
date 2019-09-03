import {Action} from "redux";
import {IGameActionCreator} from "../action/game_action";

import {
    IRequestInitGameActionItem,
    IRequestUpdateGameActionItem,
    IRequestFinishGameActionItem,
} from "../action/game_action_item"

export interface IGameDispatcher {
    initGame(item: IRequestInitGameActionItem): void;

    updateGame(item: IRequestUpdateGameActionItem): void;

    finishGame(item: IRequestFinishGameActionItem): void;

}

class Dispatcher implements IGameDispatcher {

    constructor(private dispatch: (action: Action) => void,
                private actionCreator: IGameActionCreator) {};

    public initGame = (item: IRequestInitGameActionItem,): void => {
        this.dispatch(this.actionCreator.requestInitGameAction(item));};

    public updateGame = (item: IRequestUpdateGameActionItem,): void => {
        this.dispatch(this.actionCreator.requestUpdateGameAction(item));};

    public finishGame = (item: IRequestFinishGameActionItem,): void => {
        this.dispatch(this.actionCreator.requestFinishGameAction(item));};

}

export const createGameDispatcher = (dispatch: (action: Action) => void, actionCreator: IGameActionCreator): IGameDispatcher => {
    return new Dispatcher(dispatch, actionCreator);
};
