import {User} from "../../domain/model/user";
import {PlayRoom} from "../../domain/model/play_room";
import {Game} from "../../domain/model/game";

export interface IListenerOnPlayRoomsActionItem {
    playRooms: PlayRoom[],
    games: Game[],
}

export interface IRequestInitPlayRoomsActionItem {
}
export interface ICallbackInitPlayRoomsActionItem {
}

export interface IRequestFinalPlayRoomsActionItem {
}
export interface ICallbackFinalPlayRoomsActionItem {
}

export interface IRequestGetPlayRoomsActionItem {
}
export interface ICallbackGetPlayRoomsActionItem {
    playRooms: PlayRoom[],
    games: Game[],
}

export interface IRequestCreatePlayRoomActionItem {
    owner: User,
}
export interface ICallbackCreatePlayRoomActionItem {
}
