import {call, put, take, fork, select} from "redux-saga/effects";

import {
    createGameActionCreator,
    GameActionType,
    IGameActionCreator,
    IRequestInitGameAction,
    IRequestFinishGameAction,
    IRequestUpdateGameAction,
} from "../action/game_action";
import {
    IListenerOnGameDetailDiffActionItem,
    IRequestFinishGameActionItem,
    ICallbackInitGameActionItem,
    ICallbackUpdateGameActionItem,
    ICallbackFinishGameActionItem,
} from "../action/game_action_item";

import {createGameGreeUseCase, IGameTreeUseCase} from "../../domain/usecase/game_tree_usecase";
import {createGameUseCase, IGameUseCase} from "../../domain/usecase/game_usecase";
import {createGameDetailUseCase, IGameDetailUseCase} from "../../domain/usecase/game_detail_usecase";
import {Game, GameStatus} from "../../domain/model/game";
import {Board, State} from "../../domain/model/board";
import {Cell, GameDetail, GameTree, Move, Player} from "../../domain/model/game_detail";
import {eventChannel} from "@redux-saga/core";
import {AppState} from "../store/app_state";
import {GameState} from "../store/game_state";
import {Score} from "../../domain/model/score";
import {handleErrorForHandler} from "./handleErrorForHandler";

const gameUsecase: IGameUseCase = createGameUseCase();
const gameDetailUsecase: IGameDetailUseCase = createGameDetailUseCase();
const gameTreeUsecase: IGameTreeUseCase = createGameGreeUseCase();

const actionCreator: IGameActionCreator = createGameActionCreator();

const gameDetailChannel = () => {
    const channel = eventChannel(emit => {
        gameDetailUsecase.onGameDetailDiff((gameDetail: GameDetail) =>{
            emit({gameDetail})
        });

        const unsubscribe = () => {};

        return unsubscribe
    });
    return channel
};

function* onGameDetailDiff() {
    const channel = yield call(gameDetailChannel);
    while (true) {
        try {
            const { gameDetail } = yield take(channel);
            // 現状のStateを取得し更新用のデータを作成する

            const cell: Cell = gameDetail.cell;

            const selector = (state: AppState) => state.gameReducer;
            const _state: GameState = yield select(selector);
            const _game: Game | null = _state.game;
            const _gameTree: GameTree | null = _state.gameTree;

            if (_game === null) { throw new Error("")}
            if (_gameTree === null) { throw new Error("")}

            const _moves: Move[] = _gameTree.moves;

            // eslint-disable-next-line array-callback-return
            const result: Move[] = _moves.filter((value) => {
                if (value.cell !== null ) {
                    return (value.cell.x === cell.x && value.cell.y === cell.y);
                }
            });
            const gameTree = nextGameTree(result[0].gameTreePromise);
            const res: IListenerOnGameDetailDiffActionItem = {gameTree, gameDetail};
            yield put(actionCreator.listenerOnGameDetailDiffAction(true, res));

            const game: Game = _game;

            // 終了判定 && 終了処理
            let isFinished: boolean = false;
            if (gameTree.moves === []) { isFinished = true }
            if (gameTree.moves.length === 1 && gameTree.moves[0].cell === null) { isFinished = true }
            if (isFinished) {
                const req: IRequestFinishGameActionItem = { game, gameTree };
                yield put(actionCreator.requestFinishGameAction(req));
            }

        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.listenerOnGameDetailDiffAction(false));
        }
    }
}

function* handleInitGameInGame() {
    while (true) {
        try {
            const action: IRequestInitGameAction = yield take(GameActionType.REQUEST_INIT_GAME);
            const game: Game | null = yield call(getGame, action.item.id);
            if (!game) { throw new Error("")}
            const initGameTree: GameTree = makeGameTree(Board.New(game.boardSize), State.State_Black, false, 1);
            const gameDetails: GameDetail[] = yield call(connectGameDetail, action.item.id);

            // 履歴の反映
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

            // 同期処理の起動
            yield fork(onGameDetailDiff);

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
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackInitGameAction(false));
        }
    }
}

function* handleUpdateGameInGame() {
    while (true) {
        try {
            const action: IRequestUpdateGameAction = yield take(GameActionType.REQUEST_UPDATE_GAME);
            const id: string = action.item.game.id;
            const cell: Cell = action.item.cell;
            const turn: number = action.item.nextTurn;

            // Online情報の同期
            yield call(addGameDetail, id, turn, cell);
            const res: ICallbackUpdateGameActionItem = {};
            yield put(actionCreator.callbackUpdateGameAction(true, res));

        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackUpdateGameAction(false));
        }
    }
}

function* handleFinishGameInGame() {
    while (true) {
        try {
            const action: IRequestFinishGameAction = yield take(GameActionType.REQUEST_FINISH_GAME);
            //ToDo: Online同期
            const game: Game = Game.From({
                id: action.item.game.id,
                playerBlack: action.item.game.playerBlack,
                playerWhite: action.item.game.playerWhite,
                gameStatus: GameStatus.GameStatus_End,
                boardSize: action.item.game.boardSize,
                updatedAt: action.item.game.updatedAt,
                createdAt: action.item.game.createdAt,
            });
            const gameTree: GameTree = action.item.gameTree;
            const score: Score = finishGame(game, gameTree.board);
            yield call(addScore, score);
            const res: ICallbackFinishGameActionItem = { game, score};
            yield put(actionCreator.callbackFinishGameAction(true, res));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackFinishGameAction(false));
        }
    }
}

const getGame = (id: string): Promise<Game | null> => {
    return gameUsecase.getGame(id);
};

const addScore = (score: Score): Promise<void> => {
    return gameUsecase.addScore(score);
};

const finishGame = (game: Game, board: Board): Score => {
    return gameUsecase.finishGame(game, board);
};

const connectGameDetail = (id:string): Promise<GameDetail[]> => {
    return gameDetailUsecase.connectGameDetail(id);
};

const addGameDetail = (id: string, turn: number, cell: Cell) : Promise<void> => {
    return gameDetailUsecase.addGameDetail(id, turn, cell);
};

const makeGameTree = (board: Board, player: Player, wasPassed: boolean, turn: number):GameTree => {
    return gameTreeUsecase.makeGameTree(board, player, wasPassed, turn);
};

const nextGameTree = (promise: any):GameTree => {
    return gameTreeUsecase.nextGameTree(promise);
};


export {handleInitGameInGame, handleUpdateGameInGame, handleFinishGameInGame}
