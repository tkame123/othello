import {Reducer} from "redux";
import {PlayRoomState} from "../store/play_room_state";
import {
    PlayRoomAction,
    PlayRoomActionType,
    ICallbackGetPlayRoomAction,
    ICallbackCreateGameOnPlayRoomAction,
} from "../action/play_room_action";

const initialState: PlayRoomState = {
    playRoom: null,
    game: null,
    isLoading: false,
};

const playRoomReducer: Reducer<PlayRoomState, PlayRoomAction> = (state = initialState, action: PlayRoomAction): PlayRoomState => {
    switch (action.type) {

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
            const _action = action as ICallbackCreateGameOnPlayRoomAction;
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

        default:
            return state;
    }
};

export default playRoomReducer;
