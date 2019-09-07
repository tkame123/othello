import {PlayRoom} from "../../domain/model/play_room";
import {User} from "../../domain/model/user";
import {Game} from "../../domain/model/game";

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
    playRoom: PlayRoom,
    game: Game | null,
}
