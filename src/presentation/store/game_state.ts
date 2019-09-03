import {Game} from "../../domain/model/game";
import {GameDetail, GameTree} from "../../domain/model/game_detail";
import {Score} from "../../domain/model/score";

export type GameState = {
    game: Game | null,
    gameTree: GameTree | null,
    gameDetails: GameDetail[],
    score: Score | null,
    isLoading: boolean,
};
