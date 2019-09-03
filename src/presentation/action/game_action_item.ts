import {Game} from "../../domain/model/game";
import {Cell, GameDetail, GameTree, Score} from "../../domain/model/game_detail";

export interface IListenerOnGameDetailDiffActionItem {
    gameTree: GameTree,
    gameDetail: GameDetail,
}

export interface IRequestInitGameActionItem {
    id: string;
}
export interface ICallbackInitGameActionItem {
    game: Game,
    gameTree: GameTree,
    gameDetails: GameDetail[],
}

export interface IRequestUpdateGameActionItem {
    game: Game,
    cell: Cell,
    nextTurn: number,

}
export interface ICallbackUpdateGameActionItem {
}

export interface IRequestFinishGameActionItem {
    game: Game,
    gameTree: GameTree,
}
export interface ICallbackFinishGameActionItem {
    game: Game,
    score: Score,
}
