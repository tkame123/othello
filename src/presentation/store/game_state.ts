import {Game, GameTree, Score} from "../../domain/model/game";

export type GameState = {
    game: Game | null,
    gameTree: GameTree | null,
    score: Score | null,
    isLoading: boolean,
};
