import {Game} from "../../domain/model/game";

export interface IListenerOnGamesActionItem {
    games: Game[],
}

export interface IRequestGetGamesActionItem {
}
export interface ICallbackGetGamesActionItem {
    games: Game[],
}
