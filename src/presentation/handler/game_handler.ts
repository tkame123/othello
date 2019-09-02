import {put, take} from "redux-saga/effects";

import {
    createGameActionCreator,
    GameActionType,
    IGameActionCreator,
    IRequestCreateGameAction,
    IRequestFinishGameAction,
    IRequestUpdateGameAction,
} from "../action/game_action";
import {
    IRequestFinishGameActionItem,
    ICallbackCreateGameActionItem,
    ICallbackUpdateGameActionItem,
    ICallbackFinishGameActionItem,
} from "../action/game_action_item";

import {createGameUseCase, IGameUseCase} from "../../domain/usecase/game_usecase";
import {Game, GameStatus, GameTree, Player, Score} from "../../domain/model/game";
import {Board, State} from "../../domain/model/board";

const gameUsecase: IGameUseCase = createGameUseCase();
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
                action.item.game.updatedAt,
                action.item.game.createdAt);
            // 終了判定 && 終了処理
            let isFinished: boolean = false;
            if (gameTree.moves === []) { isFinished = true }
            if (gameTree.moves.length === 1 && gameTree.moves[0].cell === null) { isFinished = true }
            if (isFinished) {
                const req: IRequestFinishGameActionItem = { game };
                yield put(actionCreator.requestFinishGameAction(req));
            }

            const res: ICallbackUpdateGameActionItem = { game, gameTree};
            yield put(actionCreator.callbackUpdateGameAction(true, res));
        } catch (error) {
            yield put(actionCreator.callbackUpdateGameAction(false));
        }
    }
}

function* handleFinishGameInGame() {
    while (true) {
        try {
            const action: IRequestFinishGameAction = yield take(GameActionType.REQUEST_FINISH_GAME);
            const game: Game = Game.From(
                action.item.game.id,
                action.item.game.board,
                action.item.game.playerWhite,
                action.item.game.playerBlack,
                GameStatus.GameStatus_End,
                action.item.game.updatedAt,
                action.item.game.createdAt);
            const score: Score = finishGame(game.board);
            const res: ICallbackFinishGameActionItem = { game, score};
            yield put(actionCreator.callbackFinishGameAction(true, res));
        } catch (error) {
            yield put(actionCreator.callbackFinishGameAction(false));
        }
    }
}

const makeGameTree = (board: Board, player: Player, wasPassed: boolean, nest: number):GameTree => {
    return gameUsecase.makeGameTree(board, player, wasPassed, nest);
};

const nextGameTree = (promise: any):GameTree => {
    return gameUsecase.nextGameTree(promise);
};

const finishGame = (board: Board):Score => {
    return gameUsecase.finishGame(board);
};

export {handleCreateGameInGame, handleUpdateGameInGame, handleFinishGameInGame}
