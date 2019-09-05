import {Game} from "../../domain/model/game";
import {Cell, GameDetail, GameTree} from "../../domain/model/game_detail";
import {Score} from "../../domain/model/score";

export interface IListenerOnGameDetailDiffActionItem {
    gameTree: GameTree,
    gameDetail: GameDetail,
    score: Score,
}

export interface IRequestInitGameActionItem {
    id: string;
}
export interface ICallbackInitGameActionItem {
    game: Game,
    gameTree: GameTree,
    gameDetails: GameDetail[],
    score: Score,
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
