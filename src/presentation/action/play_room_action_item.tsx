import {PlayRoom} from "../../domain/model/play_room";
import {User} from "../../domain/model/user";

export interface IRequestGetPlayRoomActionItem {
    id: string;
}
export interface ICallbackGetPlayRoomActionItem {
    playRoom: PlayRoom,
}

export interface IRequestCreateGameOnPlayRoomActionItem {
    id: string;
    playerBlack: User,
    playerWhite: User,
}
export interface ICallbackCreateGameOnPlayRoomActionItem {
    playRoom: PlayRoom,
}
