import {PlayRoom} from "../../domain/model/play_room";
import {User} from "../../domain/model/user";
import {Game} from "../../domain/model/game";

export interface IListenerOnPlayRoomActionItem {
    playRoom: PlayRoom,
    game: Game | null,
}

export interface IRequestInitPlayRoomActionItem {
    id: string;
}
export interface ICallbackInitPlayRoomActionItem {
}

export interface IRequestFinalPlayRoomActionItem {
}
export interface ICallbackFinalPlayRoomActionItem {
}

export interface IRequestGetPlayRoomActionItem {
    id: string;
}
export interface ICallbackGetPlayRoomActionItem {
    playRoom: PlayRoom,
    game: Game | null,
}

export interface IRequestCreateGameOnPlayRoomActionItem {
    playRoomId: string;
    boardSize: number,
    playerBlack: User,
    playerWhite: User,
}
export interface ICallbackCreateGameOnPlayRoomActionItem {
}

export interface IRequestUpdatePlayRoomPlayerActionItem {
    id: string;
    gameId: string | null,
    playerBlack: User | null,
    playerWhite: User | null,
}
export interface ICallbackUpdatePlayRoomPlayerActionItem {
}
