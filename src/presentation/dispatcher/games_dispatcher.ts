import {Action} from "redux";
import {IGamesActionCreator} from "../action/games_action";

import {
    IRequestGetGamesActionItem,
} from "../action/games_action_item"

export interface IGamesDispatcher {
    getGames(item: IRequestGetGamesActionItem): void;

}

class Dispatcher implements IGamesDispatcher {

    constructor(private dispatch: (action: Action) => void,
                private actionCreator: IGamesActionCreator) {};

    public getGames = (item: IRequestGetGamesActionItem,): void => {
        this.dispatch(this.actionCreator.requestGetGamesAction(item));};

}

export const createGamesDispatcher = (dispatch: (action: Action) => void, actionCreator: IGamesActionCreator): IGamesDispatcher => {
    return new Dispatcher(dispatch, actionCreator);
};
