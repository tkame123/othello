import {Game} from "../../domain/model/game";
import {Cell, GameDetail, GameTree, Score} from "../../domain/model/game_detail";

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
    gameTreePromise: GameTree,
    cell: Cell,

}
export interface ICallbackUpdateGameActionItem {
    game: Game,
    gameTree: GameTree,
}

export interface IRequestFinishGameActionItem {
    game: Game,
    gameTree: GameTree,
}
export interface ICallbackFinishGameActionItem {
    game: Game,
    score: Score,
}
