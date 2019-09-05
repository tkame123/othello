import {PlayRoom} from "../../domain/model/play_room";
import {Game} from "../../domain/model/game";

export type PlayRoomsState = {
    playRooms: PlayRoom[],
    games: Game[],
    isLoading: boolean,
};
