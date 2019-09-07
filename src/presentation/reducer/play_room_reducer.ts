import {Reducer} from "redux";
import {PlayRoomState} from "../store/play_room_state";
import {
    PlayRoomAction,
    PlayRoomActionType,
    IListenerOnPlayRoomAction,
    ICallbackGetPlayRoomAction,
} from "../action/play_room_action";

const initialState: PlayRoomState = {
    playRoom: null,
    game: null,
    isLoading: false,
};

const playRoomReducer: Reducer<PlayRoomState, PlayRoomAction> = (state = initialState, action: PlayRoomAction): PlayRoomState => {
    switch (action.type) {

        case PlayRoomActionType.LISTENER_ON_PLAY_ROOM: {
            const _action = action as IListenerOnPlayRoomAction;
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRoom: _action.item ? _action.item.playRoom : null,
                    game: _action.item ? _action.item.game : null,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    isLoading: false,
                });
            }
        }

        case PlayRoomActionType.REQUEST_INIT_PLAY_ROOM: {
            return Object.assign({}, state, {
                playRoom: state.playRoom,
                game: state.game,
                isLoading: true,
            });
        }
        case PlayRoomActionType.CALLBACK_INIT_PLAY_ROOM: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    isLoading: false,
                });
            }
        }

        case PlayRoomActionType.REQUEST_FINAL_PLAY_ROOM: {
            return Object.assign({}, state, {
                playRoom: state.playRoom,
                game: state.game,
                isLoading: true,
            });
        }
        case PlayRoomActionType.CALLBACK_FINAL_PLAY_ROOM: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRoom: null,
                    game: null,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    isLoading: false,
                });
            }
        }

        case PlayRoomActionType.REQUEST_GET_PLAY_ROOM: {
            return Object.assign({}, state, {
                playRoom: state.playRoom,
                game: state.game,
                isLoading: true,
            });
        }
        case PlayRoomActionType.CALLBACK_GET_PLAY_ROOM: {
            const _action = action as ICallbackGetPlayRoomAction;
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRoom: _action.item ? _action.item.playRoom : null,
                    game: _action.item ? _action.item.game : null,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    isLoading: false,
                });
            }
        }

        case PlayRoomActionType.REQUEST_CREATE_GAME_ON_PLAY_ROOM: {
            return Object.assign({}, state, {
                playRoom: state.playRoom,
                game: state.game,
                isLoading: true,
            });
        }
        case PlayRoomActionType.CALLBACK_CREATE_GAME_ON_PLAY_ROOM: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    isLoading: false,
                });
            }
        }

        case PlayRoomActionType.REQUEST_UPDATE_PLAY_ROOM_PLAYER: {
            return Object.assign({}, state, {
                playRoom: state.playRoom,
                game: state.game,
                isLoading: true,
            });
        }
        case PlayRoomActionType.CALLBACK_UPDATE_PLAY_ROOM_PLAYER: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    isLoading: false,
                });
            }
        }

        default:
            return state;
    }
};

export default playRoomReducer;
