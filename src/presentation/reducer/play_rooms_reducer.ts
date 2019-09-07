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
    isLoading: false,
};

const playRoomsReducer: Reducer<PlayRoomsState, PlayRoomsAction> = (state = initialState, action: PlayRoomsAction): PlayRoomsState => {
    switch (action.type) {

        case PlayRoomsActionType.LISTENER_ON_PLAY_ROOMS: {
            const _action = action as IListenerOnPlayRoomsAction;
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRooms: _action.item ? _action.item.playRooms : [],
                    isLoading: state.isLoading,
                });
            } else {
                return Object.assign({}, state, {
                    playRooms: state.playRooms,
                    isLoading: state.isLoading,
                });
            }
        }

        case PlayRoomsActionType.REQUEST_INIT_PLAY_ROOMS: {
            return Object.assign({}, state, {
                playRooms: state.playRooms,
                isLoading: true,
            });
        }
        case PlayRoomsActionType.CALLBACK_INIT_PLAY_ROOMS: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRooms: state.playRooms,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    playRooms: state.playRooms,
                    isLoading: false,
                });
            }
        }

        case PlayRoomsActionType.REQUEST_FINAL_PLAY_ROOMS: {
            return Object.assign({}, state, {
                playRooms: state.playRooms,
                isLoading: true,
            });
        }
        case PlayRoomsActionType.CALLBACK_FINAL_PLAY_ROOMS: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRooms: [],
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    playRooms: state.playRooms,
                    isLoading: false,
                });
            }
        }

        case PlayRoomsActionType.REQUEST_GET_PLAY_ROOMS: {
            return Object.assign({}, state, {
                playRooms: state.playRooms,
                isLoading: true,
            });
        }
        case PlayRoomsActionType.CALLBACK_GET_PLAY_ROOMS: {
            const _action = action as ICallbackGetPlayRoomsAction;
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRooms: _action.item ? _action.item.playRooms : [],
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    playRooms: state.playRooms,
                    isLoading: false,
                });
            }
        }

        case PlayRoomsActionType.REQUEST_CREATE_PLAY_ROOM: {
            return Object.assign({}, state, {
                playRooms: state.playRooms,
                isLoading: true,
            });
        }
        case PlayRoomsActionType.CALLBACK_CREATE_PLAY_ROOM: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRooms: state.playRooms,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    playRooms: state.playRooms,
                    isLoading: false,
                });
            }
        }

        case PlayRoomsActionType.REQUEST_DELETE_PLAY_ROOMS: {
            return Object.assign({}, state, {
                playRooms: state.playRooms,
                isLoading: true,
            });
        }
        case PlayRoomsActionType.CALLBACK_DELETE_PLAY_ROOMS: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRooms: state.playRooms,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    playRooms: state.playRooms,
                    isLoading: false,
                });
            }
        }

        default:
            return state;
    }
};

export default playRoomsReducer;
