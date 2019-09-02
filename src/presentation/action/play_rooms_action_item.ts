import {User} from "../../domain/model/user";
import {PlayRoom} from "../../domain/model/play_room";

export interface IListenerOnPlayRoomsActionItem {
    playRooms: PlayRoom[],
}

export interface IRequestGetPlayRoomsActionItem {
}
export interface ICallbackGetPlayRoomsActionItem {
    playRooms: PlayRoom[],
}

export interface IRequestCreatePlayRoomActionItem {
    owner: User,
}
export interface ICallbackCreatePlayRoomActionItem {
}
