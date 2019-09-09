import {PlayRoom} from "../../domain/model/play_room";
import {Game} from "../../domain/model/game";
import {Vote} from "../../domain/model/vote";

export type PlayRoomState = {
    playRoom: PlayRoom | null,
    game: Game | null,
    votes: Vote[],
    isLoading: boolean,
};
