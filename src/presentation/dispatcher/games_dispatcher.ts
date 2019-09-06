import {Action} from "redux";
import {IGamesActionCreator} from "../action/games_action";

import {
    IRequestInitGamesActionItem,
    IRequestFinalGamesActionItem,
    IRequestGetGamesActionItem,
} from "../action/games_action_item"

export interface IGamesDispatcher {

    initGames(item: IRequestInitGamesActionItem): void;

    finalGames(item: IRequestFinalGamesActionItem): void;

    getGames(item: IRequestGetGamesActionItem): void;

}

class Dispatcher implements IGamesDispatcher {

    constructor(private dispatch: (action: Action) => void,
                private actionCreator: IGamesActionCreator) {};

    public initGames = (item: IRequestInitGamesActionItem,): void => {
        this.dispatch(this.actionCreator.requestInitGamesAction(item));};

    public finalGames = (item: IRequestFinalGamesActionItem,): void => {
        this.dispatch(this.actionCreator.requestFinalGamesAction(item));};

    public getGames = (item: IRequestGetGamesActionItem,): void => {
        this.dispatch(this.actionCreator.requestGetGamesAction(item));};

}

export const createGamesDispatcher = (dispatch: (action: Action) => void, actionCreator: IGamesActionCreator): IGamesDispatcher => {
    return new Dispatcher(dispatch, actionCreator);
};
