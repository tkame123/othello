import {Game, GameTree} from "../../domain/model/game";

export type GameState = {
    game: Game | null,
    gameTree: GameTree | null,
    isLoading: boolean,
};
