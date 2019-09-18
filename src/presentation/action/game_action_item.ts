import {Game} from "../../domain/model/game";
import {Cell, GameDetail, GameTree} from "../../domain/model/game_detail";
import {Score} from "../../domain/model/score";

export interface IListenerOnGameActionItem {
    game: Game,
}

export interface IListenerOnGameDetailDiffActionItem {
    gameTree: GameTree,
    gameDetail: GameDetail,
    score: Score,
}

export interface IRequestInitGameActionItem {
    gameId: string;
}
export interface ICallbackInitGameActionItem {
    game: Game,
    gameTree: GameTree,
    gameDetails: GameDetail[],
    score: Score,
}

export interface IRequestFinalGameActionItem {
}
export interface ICallbackFinalGameActionItem {
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
}
