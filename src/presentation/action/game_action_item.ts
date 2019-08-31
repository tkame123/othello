import {User} from "../../domain/model/user";
import {Game, GameTree, Move, Player} from "../../domain/model/game";

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
