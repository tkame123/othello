import {Action} from "redux";
import {IPlayRoomActionCreator} from "../action/play_room_action";

import {
    IRequestInitPlayRoomActionItem,
    IRequestFinalPlayRoomActionItem,
    IRequestGetPlayRoomActionItem,
    IRequestCreateGameOnPlayRoomActionItem,
    IRequestUpdatePlayRoomPlayerActionItem,
    IRequestCreateVoteGameReadyActionItem,
    IRequestDeleteVoteGameReadyActionItem,
} from "../action/play_room_action_item"

export interface IPlayRoomDispatcher {

    initPlayRoom(item: IRequestInitPlayRoomActionItem): void;

    finalPlayRoom(item: IRequestFinalPlayRoomActionItem): void;

    getPlayRoom(item: IRequestGetPlayRoomActionItem): void;

    getPlayRoom(item: IRequestGetPlayRoomActionItem): void;

    createGameOnPlayRoom(item: IRequestCreateGameOnPlayRoomActionItem): void;

    updatePlayRoomPlayer(item: IRequestUpdatePlayRoomPlayerActionItem): void;

    createVoteGameReady(item: IRequestCreateVoteGameReadyActionItem): void;

    deleteVoteGameReady(item: IRequestDeleteVoteGameReadyActionItem): void;

}

class Dispatcher implements IPlayRoomDispatcher {

    constructor(private dispatch: (action: Action) => void,
                private actionCreator: IPlayRoomActionCreator) {};

    public initPlayRoom = (item: IRequestInitPlayRoomActionItem,): void => {
        this.dispatch(this.actionCreator.requestInitPlayRoomAction(item));};

    public finalPlayRoom = (item: IRequestFinalPlayRoomActionItem,): void => {
        this.dispatch(this.actionCreator.requestFinalPlayRoomAction(item));};

    public getPlayRoom = (item: IRequestGetPlayRoomActionItem,): void => {
        this.dispatch(this.actionCreator.requestGetPlayRoomAction(item));};

    public createGameOnPlayRoom = (item: IRequestCreateGameOnPlayRoomActionItem,): void => {
        this.dispatch(this.actionCreator.requestCreateGameOnPlayRoomAction(item));};

    public updatePlayRoomPlayer = (item: IRequestUpdatePlayRoomPlayerActionItem,): void => {
        this.dispatch(this.actionCreator.requestUpdatePlayRoomPlayerAction(item));};

    public createVoteGameReady = (item: IRequestCreateVoteGameReadyActionItem,): void => {
        this.dispatch(this.actionCreator.requestCreateVoteGameReadyAction(item));};

    public deleteVoteGameReady = (item: IRequestDeleteVoteGameReadyActionItem,): void => {
        this.dispatch(this.actionCreator.requestDeleteVoteGameReadyAction(item));};

}

export const createPlayRoomDispatcher = (dispatch: (action: Action) => void, actionCreator: IPlayRoomActionCreator): IPlayRoomDispatcher => {
    return new Dispatcher(dispatch, actionCreator);
};
