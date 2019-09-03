import {call, put, take} from "redux-saga/effects";

import {
    createGameActionCreator,
    GameActionType,
    IGameActionCreator,
    IRequestInitGameAction,
    IRequestFinishGameAction,
    IRequestUpdateGameAction,
} from "../action/game_action";
import {
    IRequestFinishGameActionItem,
    ICallbackInitGameActionItem,
    ICallbackUpdateGameActionItem,
    ICallbackFinishGameActionItem,
} from "../action/game_action_item";

import {createGameUseCase, IGameUseCase} from "../../domain/usecase/game_usecase";
import {createAdminGameUseCase, IAdminGameUseCase} from "../../domain/usecase/admin_game_usecase";
import {createAdminGameDetailUseCase, IAdminGameDetailUseCase} from "../../domain/usecase/admin_game_detail_usecase";
import {Game, GameStatus, TParamsGameFrom} from "../../domain/model/game";
import {Board, State} from "../../domain/model/board";
import {Cell, GameDetail, GameTree, Move, Player, Score} from "../../domain/model/game_detail";

const adminGameUsecase: IAdminGameUseCase = createAdminGameUseCase();
const adminGameDetailUsecase: IAdminGameDetailUseCase = createAdminGameDetailUseCase();
const gameUsecase: IGameUseCase = createGameUseCase();

const actionCreator: IGameActionCreator = createGameActionCreator();

function* handleInitGameInGame() {
    while (true) {
        try {
            const action: IRequestInitGameAction = yield take(GameActionType.REQUEST_INIT_GAME);
            const game: Game | null = yield call(getGame, action.item.id);
            if (!game) { throw new Error("")}
            const initGameTree: GameTree = makeGameTree(Board.New(), State.State_Black, false, 1);
            const gameDetails: GameDetail[] = yield call(connectGameDetail, action.item.id);

            let gameTree: GameTree = initGameTree;
            if (gameDetails !== []) {
                gameDetails.forEach((item: GameDetail) => {
                    const cell: Cell =  item.cell;
                    const moves: Move[] = gameTree.moves;
                    // eslint-disable-next-line array-callback-return
                    const result: Move[] = moves.filter((value) => {
                        if (value.cell !== null ) {
                            return (value.cell.x === cell.x && value.cell.y === cell.y);
                        }
                    });
                    gameTree = nextGameTree(result[0].gameTreePromise);
                })
            }

            const res: ICallbackInitGameActionItem = {game, gameTree, gameDetails};
            yield put(actionCreator.callbackInitGameAction(true, res));

            // 終了判定 && 終了処理
            let isFinished: boolean = false;
            if (gameTree.moves === []) { isFinished = true }
            if (gameTree.moves.length === 1 && gameTree.moves[0].cell === null) { isFinished = true }
            if (isFinished) {
                const req: IRequestFinishGameActionItem = { game, gameTree };
                yield put(actionCreator.requestFinishGameAction(req));
            }

        } catch (error) {
            yield put(actionCreator.callbackInitGameAction(false));
        }
    }
}

function* handleUpdateGameInGame() {
    while (true) {
        try {
            const action: IRequestUpdateGameAction = yield take(GameActionType.REQUEST_UPDATE_GAME);
            const gameTree: GameTree = nextGameTree(action.item.gameTreePromise);
            const game: Game = action.item.game;

            const id: string = action.item.game.id;
            const cell: Cell = action.item.cell;
            const turn: number = gameTree.turn;

            // Online情報の同期
            yield call(addGameDetail, id, turn, cell);

            const res: ICallbackUpdateGameActionItem = { game, gameTree};
            yield put(actionCreator.callbackUpdateGameAction(true, res));

            // 終了判定 && 終了処理
            let isFinished: boolean = false;
            if (gameTree.moves === []) { isFinished = true }
            if (gameTree.moves.length === 1 && gameTree.moves[0].cell === null) { isFinished = true }
            if (isFinished) {
                const req: IRequestFinishGameActionItem = { game, gameTree };
                yield put(actionCreator.requestFinishGameAction(req));
            }

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

const getGame = (id: string): Promise<Game | null> => {
    return adminGameUsecase.getGame(id);
};

const connectGameDetail = (id:string): Promise<GameDetail[]> => {
    return adminGameDetailUsecase.connectGameDetail(id);
};

const addGameDetail = (id: string, turn: number, cell: Cell) : Promise<void> => {
    return adminGameDetailUsecase.addGameDetail(id, turn, cell);
};

const makeGameTree = (board: Board, player: Player, wasPassed: boolean, turn: number):GameTree => {
    return gameUsecase.makeGameTree(board, player, wasPassed, turn);
};

const nextGameTree = (promise: any):GameTree => {
    return gameUsecase.nextGameTree(promise);
};

const finishGame = (board: Board):Score => {
    return gameUsecase.finishGame(board);
};


export {handleInitGameInGame, handleUpdateGameInGame, handleFinishGameInGame}
