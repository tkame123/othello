import {Game} from "../../domain/model/game";

export type GamesState = {
    games: Game[],
    isLoading: boolean,
};
