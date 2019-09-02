import {PlayRoom} from "../../domain/model/play_room";

export type PlayRoomState = {
    playRoom: PlayRoom | null,
    isLoading: boolean,
};
