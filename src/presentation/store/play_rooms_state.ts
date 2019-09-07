import {PlayRoom} from "../../domain/model/play_room";

export type PlayRoomsState = {
    playRooms: PlayRoom[],
    isLoading: boolean,
};
