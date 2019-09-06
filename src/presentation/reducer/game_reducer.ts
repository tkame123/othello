import {Reducer} from "redux";
import {GameState} from "../store/game_state";
import {
    GameAction,
    GameActionType,
    IListenerOnGameDetailDiffAction,
    ICallbackInitGameAction,
    ICallbackFinishGameAction,
} from "../action/game_action";

const initialState: GameState = {
    game: null,
    gameTree: null,
    gameDetails: [],
    score: null,
    isLoading: false,
};

const gameReducer: Reducer<GameState, GameAction> = (state = initialState, action: GameAction): GameState => {
    switch (action.type) {

        case GameActionType.LISTENER_ON_GAME_DETAIL_DIFF: {
            const _action = action as IListenerOnGameDetailDiffAction;
            if (action.isSuccess) {
                const gameDetails = _action.item
                    ? state.gameDetails.concat(_action.item.gameDetail)
                    : state.gameDetails;

                return Object.assign({}, state, {
                    game: state.game,
                    gameTree: _action.item ? _action.item.gameTree : null,
                    gameDetails: gameDetails,
                    score: _action.item ? _action.item.score : null,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    game: state.game,
                    gameTree: state.gameTree,
                    gameDetails: state.gameDetails,
                    score: state.score,
                    isLoading: false,
                });
            }
        }

        case GameActionType.REQUEST_INIT_GAME: {
            return Object.assign({}, state, {
                game: state.game,
                gameTree: state.gameTree,
                gameDetails: state.gameDetails,
                score: state.score,
                isLoading: true,
            });
        }
        case GameActionType.CALLBACK_INIT_GAME: {
            const _action = action as ICallbackInitGameAction;
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    game: _action.item ? _action.item.game : null,
                    gameTree: _action.item ? _action.item.gameTree : null,
                    gameDetails: _action.item ? _action.item.gameDetails : [],
                    score: _action.item ? _action.item.score : null,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    game: state.game,
                    gameTree: state.gameTree,
                    gameDetails: state.gameDetails,
                    score: state.score,
                    isLoading: false,
                });
            }
        }

        case GameActionType.REQUEST_FINAL_GAME: {
            return Object.assign({}, state, {
                game: state.game,
                gameTree: state.gameTree,
                gameDetails: state.gameDetails,
                score: state.score,
                isLoading: true,
            });
        }
        case GameActionType.CALLBACK_FINAL_GAME: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    game: null,
                    gameTree: null,
                    gameDetails: [],
                    score: null,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    game: state.game,
                    gameTree: state.gameTree,
                    gameDetails: state.gameDetails,
                    score: state.score,
                    isLoading: false,
                });
            }
        }

        case GameActionType.REQUEST_UPDATE_GAME: {
            return Object.assign({}, state, {
                game: state.game,
                gameTree: state.gameTree,
                gameDetails: state.gameDetails,
                score: state.score,
                isLoading: true,
            });
        }
        case GameActionType.CALLBACK_UPDATE_GAME: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    game: state.game,
                    gameTree: state.gameTree,
                    gameDetails: state.gameDetails,
                    score: state.score,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    game: state.game,
                    gameTree: state.gameTree,
                    gameDetails: state.gameDetails,
                    score: state.score,
                    isLoading: false,
                });
            }
        }

        case GameActionType.REQUEST_FINISH_GAME: {
            return Object.assign({}, state, {
                game: state.game,
                gameTree: state.gameTree,
                gameDetails: state.gameDetails,
                score: state.score,
                isLoading: true,
            });
        }
        case GameActionType.CALLBACK_FINISH_GAME: {
            const _action = action as ICallbackFinishGameAction;
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    game: _action.item ? _action.item.game : null,
                    gameTree: state.gameTree,
                    gameDetails: state.gameDetails,
                    score: _action.item ? _action.item.score : null,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    game: state.game,
                    gameTree: state.gameTree,
                    gameDetails: state.gameDetails,
                    score: state.score,
                    isLoading: false,
                });
            }
        }

        default:
            return state;
    }
};

export default gameReducer;
