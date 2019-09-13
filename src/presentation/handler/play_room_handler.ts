import {call, put, take, fork, cancelled, cancel} from "redux-saga/effects";
import {push} from "connected-react-router";

import {
    createPlayroomActionCreator,
    PlayRoomActionType,
    IPlayRoomActionCreator,
    IRequestGetPlayRoomAction,
    IRequestInitPlayRoomAction,
    IRequestCreateGameOnPlayRoomAction,
    IRequestUpdatePlayRoomPlayerAction,
    IRequestCreateVoteGameReadyAction,
    IRequestDeleteVoteGameReadyAction,
} from "../action/play_room_action";

import {PlayRoom} from "../../domain/model/play_room";
import {createPlayRoomUseCase, IPlayRoomUseCase} from "../../domain/usecase/play_room_usecae";
import {createGameUseCase, IGameUseCase} from "../../domain/usecase/game_usecase";
import {createVoteUseCase, IVoteUseCase} from "../../domain/usecase/vote_usecase";
import {User} from "../../domain/model/user";
import {handleErrorForHandler} from "./handleErrorForHandler";
import {Game} from "../../domain/model/game";
import {Task} from "@redux-saga/types";
import {eventChannel} from "@redux-saga/core";
import {Vote, VoteEventType} from "../../domain/model/vote";

const playRoomsUseCase: IPlayRoomUseCase = createPlayRoomUseCase();
const gameUseCase: IGameUseCase = createGameUseCase();
const voteUseCase: IVoteUseCase = createVoteUseCase();
const actionCreator: IPlayRoomActionCreator = createPlayroomActionCreator();

let playRoomChannelTask: Task;
let votesOnplayRoomChannelTask: Task;

const playRoomChannel = (id: string) => {
    const channel = eventChannel(emit => {
        playRoomsUseCase.onPlayRoom(id, (playRoom: PlayRoom | null) =>{
            emit({playRoom})
        });

        const unsubscribe = () => {
            playRoomsUseCase.offPlayroom();
        };

        return unsubscribe
    });
    return channel
};

function* onPlayRoom(id: string) {
    const channel = yield call(playRoomChannel, id);
    while (true) {
        try {
            const { playRoom } = yield take(channel);
            const game: Game | null = playRoom.gameId ? yield call(getGame, playRoom.gameId) : null;
            yield put(actionCreator.listenerOnPlayRoomAction(true, {playRoom, game}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.listenerOnPlayRoomAction(false));
        } finally {
            if (yield cancelled()) {
                channel.close();
            }
        }
    }
}

const votesOnPlayRoomChannel = (playRoomId: string) => {
    const channel = eventChannel(emit => {
        voteUseCase.onVotesOnPlayRoom(playRoomId, (votes: Vote[]) =>{
            emit({votes})
        });

        const unsubscribe = () => {
            voteUseCase.offVoteOnPlayRoom();
        };

        return unsubscribe
    });
    return channel
};

function* onVotesOnPlayRoom(playRoomId: string) {
    const channel = yield call(votesOnPlayRoomChannel, playRoomId);
    while (true) {
        try {
            const { votes } = yield take(channel);
            yield put(actionCreator.listenerOnVotesPlayRoomAction(true, {votes}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.listenerOnVotesPlayRoomAction(false));
        } finally {
            if (yield cancelled()) {
                channel.close();
            }
        }
    }
}

function* handleInitPlayRoomInPlayRoom() {
    while (true) {
        try {
            const action: IRequestInitPlayRoomAction = yield take(PlayRoomActionType.REQUEST_INIT_PLAY_ROOM);
            playRoomChannelTask = yield fork(onPlayRoom, action.item.playRoomId);
            votesOnplayRoomChannelTask = yield fork(onVotesOnPlayRoom, action.item.playRoomId);
            yield put(actionCreator.callbackInitPlayRoomAction(true, {}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackInitPlayRoomAction(false));
        }
    }
}

function* handleFinalPlayRoomInPlayRoom() {
    while (true) {
        try {
            yield take(PlayRoomActionType.REQUEST_FINAL_PLAY_ROOM);
            yield cancel(playRoomChannelTask);
            yield cancel(votesOnplayRoomChannelTask);
            yield put(actionCreator.callbackFinalPlayRoomAction(true, {}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackFinalPlayRoomAction(false));
        }
    }
}

function* handleGetPlayRoomInPlayRoom() {
    while (true) {
        try {
            const action: IRequestGetPlayRoomAction = yield take(PlayRoomActionType.REQUEST_GET_PLAY_ROOM);
            const playRoom: PlayRoom = yield call(getPlayRoom, action.item.playRoomId);
            const game: Game | null = playRoom.gameId
                ? yield call(getGame, playRoom.gameId)
                : null;
            yield put(actionCreator.callbackGetPlayRoomAction(true, {playRoom, game}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackGetPlayRoomAction(false));
        }
    }
}

function* handleCreateGameOnPlayRoomInPlayRoom() {
    while (true) {
        try {
            const action: IRequestCreateGameOnPlayRoomAction = yield take(PlayRoomActionType.REQUEST_CREATE_GAME_ON_PLAY_ROOM);
            yield call(createGameWithUpdatePlayRoom, action.item.playRoomId, action.item.boardSize, action.item.playerBlack, action.item.playerWhite);
            const playRoom: PlayRoom = yield call(getPlayRoom, action.item.playRoomId);
            yield put(actionCreator.callbackCreateGameOnPlayRoomAction(true, {}));
            yield put(push(`/playroom/${playRoom.id}?g=${playRoom.gameId}`));

        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackCreateGameOnPlayRoomAction(false));
        }
    }
}

function* handleUpdatePlayRoomPlayerInPlayRoom() {
    while (true) {
        try {
            const action: IRequestUpdatePlayRoomPlayerAction = yield take(PlayRoomActionType.REQUEST_UPDATE_PLAY_ROOM_PLAYER);
            yield call(updatePlayRoom, action.item.playRoomId, null, action.item.playerBlack, action.item.playerWhite);
            yield put(actionCreator.callbackUpdatePlayRoomPlayerAction(true, {}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackUpdatePlayRoomPlayerAction(false));
        }
    }
}

function* handleCreateVoteGameReadyInPlayRoom() {
    while (true) {
        try {
            const action: IRequestCreateVoteGameReadyAction = yield take(PlayRoomActionType.REQUEST_CREATE_VOTE_GAME_READY);
            yield call(createVoteOnPlayRoom, action.item.playRoomId, action.item.eventType, action.item.userId, action.item.message);
            yield put(actionCreator.callbackCreateVoteGameReadyAction(true, {}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackCreateVoteGameReadyAction(false));
        }
    }
}

function* handleDeleteVoteGameReadyInPlayRoom() {
    while (true) {
        try {
            const action: IRequestDeleteVoteGameReadyAction = yield take(PlayRoomActionType.REQUEST_DELETE_VOTE_GAME_READY);
            yield call(deleteVoteOnPlayRoom, action.item.playRoomId, action.item.eventType);
            yield put(actionCreator.callbackDeleteVoteGameReadyAction(true, {}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackDeleteVoteGameReadyAction(false));
        }
    }
}

const getPlayRoom = (playRoomId: string): Promise<PlayRoom | null> => {
    return playRoomsUseCase.getPlayRoom(playRoomId);
};

const getGame = (gameId: string): Promise<Game | null> => {
    return gameUseCase.getGame(gameId);
};

const updatePlayRoom = (playRoomId: string, gameId: string | null , playerBlack: User | null, playerWhite: User | null): Promise<void> => {
    return playRoomsUseCase.updatePlayRoom(playRoomId, gameId, playerBlack, playerWhite);
};

const createGameWithUpdatePlayRoom = (playRoomId: string, boardSize: number, playerBlack: User, playerWhite: User): Promise<void> => {
    return gameUseCase.createGameWithUpdatePlayRoom(playRoomId, boardSize, playerBlack, playerWhite);
};

const createVoteOnPlayRoom = (playRoomId: string, eventType: VoteEventType, userId: string, message: string): Promise<void> => {
    return voteUseCase.createVoteOnPlayRoom(playRoomId, eventType, userId, message);
};

const deleteVoteOnPlayRoom = (playRoomId: string, eventType: VoteEventType): Promise<void> => {
    return voteUseCase.deleteVotesOnPlayRoom(playRoomId, eventType);
};

export {handleInitPlayRoomInPlayRoom, handleFinalPlayRoomInPlayRoom, handleGetPlayRoomInPlayRoom, handleCreateGameOnPlayRoomInPlayRoom, handleUpdatePlayRoomPlayerInPlayRoom, handleCreateVoteGameReadyInPlayRoom, handleDeleteVoteGameReadyInPlayRoom}
