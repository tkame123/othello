import {User} from "../../domain/model/user";
import {PlayRoom} from "../../domain/model/play_room";

export interface IRequestGetPlayRoomActionItem {
    id: string;
}
export interface ICallbackGetPlayRoomActionItem {
    playRoom: PlayRoom,
}
