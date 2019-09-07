import {PlayRoom} from "../../domain/model/play_room";

export interface IListenerOnPlayRoomsActionItem {
    playRooms: PlayRoom[],
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
}

export interface IRequestCreatePlayRoomActionItem {
}
export interface ICallbackCreatePlayRoomActionItem {
}

export interface IRequestDeletePlayRoomActionItem {
    playRooms: PlayRoom[],
}
export interface ICallbackDeletePlayRoomActionItem {
}
