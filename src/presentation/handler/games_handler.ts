import {put, take, call} from "redux-saga/effects";
import {eventChannel} from 'redux-saga'

import {
    createGamesActionCreator,
    GamesActionType,
    IGamesActionCreator,
} from "../action/games_action";
import {
    IListenerOnGamesActionItem,
    ICallbackGetGamesActionItem,
} from "../action/games_action_item";

import {Game} from "../../domain/model/game";
import {createAdminGameUseCase, IAdminGameUseCase} from "../../domain/usecase/admin_game_usecase";

const gameUseCase: IAdminGameUseCase = createAdminGameUseCase();
const actionCreator: IGamesActionCreator = createGamesActionCreator();

const gamessChannel = () => {
    const channel = eventChannel(emit => {
        gameUseCase.onGames((games: Game[]) =>{
            emit({games})
        });

        const unsubscribe = () => {};

        return unsubscribe
    });
    return channel
};

function* onGames() {
    const channel = yield call(gamessChannel);
    while (true) {
        try {
            const { games } = yield take(channel);
            const res: IListenerOnGamesActionItem = {games};
            yield put(actionCreator.listenerOnGamesAction(true, res));
        } catch (error) {
            yield put(actionCreator.listenerOnGamesAction(false));
        }
    }
}

function* handleGamesInGames() {
    while (true) {
        try {
            yield take(GamesActionType.REQUEST_GET_GAMES);
            const games: Game[] = yield call(getGames);
            const res: ICallbackGetGamesActionItem = {games};
            yield put(actionCreator.callbackGetGamesAction(true, res));
        } catch (error) {
            yield put(actionCreator.callbackGetGamesAction(false));
        }
    }
}


const getGames = (): Promise<Game[]> => {
    return gameUseCase.getGames();
};

export {onGames, handleGamesInGames}