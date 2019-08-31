import {User} from "../../domain/model/user";
import {Game, GameTree, Score} from "../../domain/model/game";
import {State} from "../../domain/model/board";

export interface IRequestCreateGameActionItem {
    playerWhite: User,
    playerBlack: User,
}
export interface ICallbackCreateGameActionItem {
    game: Game,
    gameTree: GameTree,
}

export interface IRequestUpdateGameActionItem {
    game: Game,
    gameTreePromise: GameTree,
}

export interface ICallbackUpdateGameActionItem {
    game: Game,
    gameTree: GameTree,
}

export interface IRequestFinishGameActionItem {
    game: Game,
}

export interface ICallbackFinishGameActionItem {
    game: Game,
    score: Score,
}
