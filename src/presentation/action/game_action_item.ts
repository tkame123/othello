import {User} from "../../domain/model/user";
import {Game, GameTree, Score} from "../../domain/model/game";

export interface IRequestCreateGameActionItem {
    playerBlack: User,
    playerWhite: User,
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
    gameTree: GameTree,
}

export interface ICallbackFinishGameActionItem {
    game: Game,
    score: Score,
}
