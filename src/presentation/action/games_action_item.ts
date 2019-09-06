import {Game} from "../../domain/model/game";

export interface IListenerOnGamesActionItem {
    games: Game[],
}

export interface IRequestInitGamesActionItem {
}
export interface ICallbackInitGamesActionItem {
}

export interface IRequestFinalGamesActionItem {
}
export interface ICallbackFinalGamesActionItem {
}

export interface IRequestGetGamesActionItem {
}
export interface ICallbackGetGamesActionItem {
    games: Game[],
}
