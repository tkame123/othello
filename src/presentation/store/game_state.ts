import {Game} from "../../domain/model/game";
import {GameDetail, GameTree, Score} from "../../domain/model/game_detail";

export type GameState = {
    game: Game | null,
    gameTree: GameTree | null,
    gameDetails: GameDetail[],
    score: Score | null,
    isLoading: boolean,
};
