import {Reducer} from "redux";
import {PlayRoomsState} from "../store/play_rooms_state";
import {
    PlayRoomsAction,
    PlayRoomsActionType,
    IListenerOnPlayRoomsAction,
    ICallbackGetPlayRoomsAction,
} from "../action/play_rooms_action";

const initialState: PlayRoomsState = {
    playRooms: [],
    games: [],
    isLoading: false,
};

const playRoomsReducer: Reducer<PlayRoomsState, PlayRoomsAction> = (state = initialState, action: PlayRoomsAction): PlayRoomsState => {
    switch (action.type) {

        case PlayRoomsActionType.LISTENER_ON_PLAYROOMS: {
            const _action = action as IListenerOnPlayRoomsAction;
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRooms: _action.item ? _action.item.playRooms : [],
                    games: _action.item ? _action.item.games : [],
                    isLoading: state.isLoading,
                });
            } else {
                return Object.assign({}, state, {
                    playRooms: state.playRooms,
                    games: state.games,
                    isLoading: state.isLoading,
                });
            }
        }

        case PlayRoomsActionType.REQUEST_GET_PLAY_ROOMS: {
            return Object.assign({}, state, {
                playRooms: state.playRooms,
                games: state.games,
                isLoading: true,
            });
        }
        case PlayRoomsActionType.CALLBACK_GET_PLAY_ROOMS: {
            const _action = action as ICallbackGetPlayRoomsAction;
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRooms: _action.item ? _action.item.playRooms : [],
                    games: _action.item ? _action.item.games : [],
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    playRooms: state.playRooms,
                    games: state.games,
                    isLoading: false,
                });
            }
        }

        case PlayRoomsActionType.REQUEST_CREATE_PLAY_ROOM: {
            return Object.assign({}, state, {
                playRooms: state.playRooms,
                games: state.games,
                isLoading: true,
            });
        }
        case PlayRoomsActionType.CALLBACK_CREATE_PLAY_ROOM: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRooms: state.playRooms,
                    games: state.games,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    playRooms: state.playRooms,
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
