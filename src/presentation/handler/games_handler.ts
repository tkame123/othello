import {put, take, call, fork, cancel} from "redux-saga/effects";
import {eventChannel, Task} from 'redux-saga'

import {
    createGamesActionCreator,
    GamesActionType,
    IGamesActionCreator,
} from "../action/games_action";

import {Game} from "../../domain/model/game";
import {createGameUseCase, IGameUseCase} from "../../domain/usecase/game_usecase";
import {handleErrorForHandler} from "./handleErrorForHandler";

const gameUseCase: IGameUseCase = createGameUseCase();
const actionCreator: IGamesActionCreator = createGamesActionCreator();

let gamesChannelTask: Task;

const gamessChannel = () => {
    const channel = eventChannel(emit => {
        gameUseCase.onGames((games: Game[]) =>{
            emit({games})
        });

        const unsubscribe = () => {
            gameUseCase.closeGames();
        };

        return unsubscribe
    });
    return channel
};

function* onGames() {
    const channel = yield call(gamessChannel);
    while (true) {
        try {
            const { games } = yield take(channel);
            yield put(actionCreator.listenerOnGamesAction(true, {games}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.listenerOnGamesAction(false));
        }
    }
}

function* handleInitGamesInGames() {
    while (true) {
        try {
            yield take(GamesActionType.REQUEST_INIT_GAMES);
            gamesChannelTask = yield fork(onGames);
            yield put(actionCreator.callbackInitGamesAction(true, {}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackInitGamesAction(false));
        }
    }
}

function* handleFinalGamesInGames() {
    while (true) {
        try {
            yield take(GamesActionType.REQUEST_FINAL_GAMES);
            yield cancel(gamesChannelTask);
            yield put(actionCreator.callbackFinalGamesAction(true, {}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackFinalGamesAction(false));
        }
    }
}

function* handleGetGamesInGames() {
    while (true) {
        try {
            yield take(GamesActionType.REQUEST_GET_GAMES);
            const games: Game[] = yield call(getGames);
            yield put(actionCreator.callbackGetGamesAction(true, {games}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackGetGamesAction(false));
        }
    }
}

const getGames = (): Promise<Game[]> => {
    return gameUseCase.getGames();
};

export {handleInitGamesInGames, handleFinalGamesInGames, handleGetGamesInGames}
