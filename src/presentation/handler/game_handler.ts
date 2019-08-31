import {put, take} from "redux-saga/effects";

import {
    createGameActionCreator,
    GameActionType,
    IGameActionCreator,
    IRequestCreateGameAction,
    IRequestUpdateGameAction,
} from "../action/game_action";
import {createGameUsecase, IGameUseCase} from "../../domain/usecase/game_usecase";
import {Game, GameTree, Player} from "../../domain/model/game";
import {ICallbackCreateGameActionItem, ICallbackUpdateGameActionItem} from "../action/game_action_item";
import {Board, State} from "../../domain/model/board";

const gameUsecase: IGameUseCase = createGameUsecase();
const actionCreator: IGameActionCreator = createGameActionCreator();

function* handleCreateGameInGame() {
    while (true) {
        try {
            const action: IRequestCreateGameAction = yield take(GameActionType.REQUEST_CREATE_GAME);
            const game: Game = Game.New(action.item.playerWhite, action.item.playerBlack);
            const gameTree: GameTree = makeGameTree(game.board, State.State_White, false, 1);
            const res: ICallbackCreateGameActionItem = {game, gameTree};
            yield put(actionCreator.callbackCreateGameAction(true, res));
        } catch (error) {
            yield put(actionCreator.callbackCreateGameAction(false));
        }

    }
}

function* handleUpdateGameInGame() {
    while (true) {
        try {
            const action: IRequestUpdateGameAction = yield take(GameActionType.REQUEST_UPDATE_GAME);
            const gameTree: GameTree = nextGameTree(action.item.gameTreePromise);
            const game: Game = Game.From(
                action.item.game.id,
                gameTree.board,
                action.item.game.playerWhite,
                action.item.game.playerBlack,
                action.item.game.gameStatus,
                action.item.game.createdAt);
            const res: ICallbackUpdateGameActionItem = { game, gameTree};
            yield put(actionCreator.callbackUpdateGameAction(true, res));
        } catch (error) {
            yield put(actionCreator.callbackUpdateGameAction(false));
        }

    }
}

const makeGameTree = (board: Board, player: Player, wasPassed: boolean, nest: number):GameTree => {
    return gameUsecase.makeGameTree(board, player, wasPassed, nest);
};

const nextGameTree = (promise: any):GameTree => {
    return gameUsecase.nextGameTree(promise);
};


export {handleCreateGameInGame, handleUpdateGameInGame}
