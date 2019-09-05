import {PlayRoom} from "../../domain/model/play_room";
import {Game} from "../../domain/model/game";

export type PlayRoomState = {
    playRoom: PlayRoom | null,
    game: Game | null,
    isLoading: boolean,
};
