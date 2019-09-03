import {Reducer} from "redux";
import {GamesState} from "../store/games_state";
import {
    GamesAction,
    GamesActionType,
    IListenerOnGamesAction,
    ICallbackGetGamesAction,
} from "../action/games_action";

const initialState: GamesState = {
    games: [],
    isLoading: false,
};

const playRoomsReducer: Reducer<GamesState, GamesAction> = (state = initialState, action: GamesAction): GamesState => {
    switch (action.type) {

        case GamesActionType.LISTENER_ON_GAMES: {
            const _action = action as IListenerOnGamesAction;
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    games: _action.item ? _action.item.games : [],
                    isLoading: state.isLoading,
                });
            } else {
                return Object.assign({}, state, {
                    games: state.games,
                    isLoading: state.isLoading,
                });
            }
        }

        case GamesActionType.REQUEST_GET_GAMES: {
            return Object.assign({}, state, {
                games: state.games,
                isLoading: true,
            });
        }
        case GamesActionType.CALLBACK_GET_GAMES: {
            const _action = action as ICallbackGetGamesAction;
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    games: _action.item ? _action.item.games : [],
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    games: state.games,
                    isLoading: false,
                });
            }
        }

        default:
            return state;
    }
};

export default playRoomsReducer;
