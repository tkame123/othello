import {PlayRoom} from "../../domain/model/play_room";
import {User} from "../../domain/model/user";
import {Game} from "../../domain/model/game";
import {Vote, VoteEventType} from "../../domain/model/vote";

export interface IListenerOnPlayRoomActionItem {
    playRoom: PlayRoom,
    game: Game | null,
}

export interface IListenerOnVotesPlayRoomActionItem {
    votes: Vote[],
}

export interface IRequestInitPlayRoomActionItem {
    playRoomId: string;
}
export interface ICallbackInitPlayRoomActionItem {
}

export interface IRequestFinalPlayRoomActionItem {
}
export interface ICallbackFinalPlayRoomActionItem {
}

export interface IRequestGetPlayRoomActionItem {
    playRoomId: string;
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
    playRoomId: string;
    gameId: string | null,
    playerBlack: User | null,
    playerWhite: User | null,
}
export interface ICallbackUpdatePlayRoomPlayerActionItem {
}

export interface IRequestCreateVoteGameReadyActionItem {
    playRoomId: string,
    eventType: VoteEventType,
    userId: string,
    message: string,
}
export interface ICallbackCreateVoteGameReadyActionItem {
}

export interface IRequestDeleteVoteGameReadyActionItem {
    playRoomId: string,
    eventType: VoteEventType,
}
export interface ICallbackDeleteVoteGameReadyActionItem {
}
