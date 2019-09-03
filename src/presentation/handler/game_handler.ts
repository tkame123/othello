import {call, put, take} from "redux-saga/effects";

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
import {createAdminGameUseCase, IAdminGameUseCase} from "../../domain/usecase/admin_game_usecase";
import {Game, GameStatus, GameTree, Player, Score, TParamsGameFrom} from "../../domain/model/game";
import {Board, State} from "../../domain/model/board";
import {User} from "../../domain/model/user";

const adminGameUsecase: IAdminGameUseCase = createAdminGameUseCase();
const gameUsecase: IGameUseCase = createGameUseCase();

const actionCreator: IGameActionCreator = createGameActionCreator();

function* handleCreateGameInGame() {
    while (true) {
        try {
            const action: IRequestCreateGameAction = yield take(GameActionType.REQUEST_CREATE_GAME);
            const game: Game = yield call(createGame, action.item.playerWhite, action.item.playerBlack);
            const gameTree: GameTree = makeGameTree(Board.New(), State.State_Black, false, 1);
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
            const params: TParamsGameFrom = {
                id: action.item.game.id,
                playerBlack: action.item.game.playerBlack,
                playerWhite: action.item.game.playerWhite,
                gameStatus: action.item.game.gameStatus,
                updatedAt: action.item.game.updatedAt,
                createdAt: action.item.game.createdAt,
            };
            const game: Game = Game.From(params);
            // 終了判定 && 終了処理
            let isFinished: boolean = false;
            if (gameTree.moves === []) { isFinished = true }
            if (gameTree.moves.length === 1 && gameTree.moves[0].cell === null) { isFinished = true }
            if (isFinished) {
                const req: IRequestFinishGameActionItem = { game, gameTree };
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
            const params: TParamsGameFrom = {
                id: action.item.game.id,
                playerBlack: action.item.game.playerBlack,
                playerWhite: action.item.game.playerWhite,
                gameStatus: GameStatus.GameStatus_End,
                updatedAt: action.item.game.updatedAt,
                createdAt: action.item.game.createdAt,
            };
            const game: Game = Game.From(params);
            const gameTree: GameTree = action.item.gameTree;
            const score: Score = finishGame(gameTree.board);
            const res: ICallbackFinishGameActionItem = { game, score};
            yield put(actionCreator.callbackFinishGameAction(true, res));
        } catch (error) {
            yield put(actionCreator.callbackFinishGameAction(false));
        }
    }
}

const createGame = (playerWhite: User, playerBlack: User): Promise<Game> => {
    return adminGameUsecase.createGame(playerWhite, playerBlack);
};

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
