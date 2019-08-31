import {Reducer} from "redux";
import {GameState} from "../store/game_state";
import {
    GameDetailAction,
    GameActionType,
    ICallbackCreateGameAction,
    ICallbackUpdateGameAction,
} from "../action/game_action";

const initialState: GameState = {
    game: null,
    gameTree: null,
    isLoading: false,
};

const gameReducer: Reducer<GameState, GameDetailAction> = (state = initialState, action: GameDetailAction): GameState => {
    switch (action.type) {

        case GameActionType.REQUEST_CREATE_GAME: {
            return Object.assign({}, state, {
                game: state.game,
                gameTree: state.gameTree,
                isLoading: true,
            });
        }
        case GameActionType.CALLBACK_CREATE_GAME: {
            const _action = action as ICallbackCreateGameAction;
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    game: _action.item ? _action.item.game : null,
                    gameTree: _action.item ? _action.item.gameTree : null,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    game: state.game,
                    gameTree: state.gameTree,
                    isLoading: false,
                });
            }
        }

        case GameActionType.REQUEST_UPDATE_GAME: {
            return Object.assign({}, state, {
                game: state.game,
                gameTree: state.gameTree,
                isLoading: true,
            });
        }
        case GameActionType.CALLBACK_UPDATE_GAME: {
            const _action = action as ICallbackUpdateGameAction;
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    game: _action.item ? _action.item.game : null,
                    gameTree: _action.item ? _action.item.gameTree : null,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    game: state.game,
                    gameTree: state.gameTree,
                    isLoading: false,
                });
            }
        }

        default:
            return state;
    }
};

export default gameReducer;
