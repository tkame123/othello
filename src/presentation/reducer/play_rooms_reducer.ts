import {Reducer} from "redux";
import {PlayRoomsState} from "../store/play_rooms_state";
import {
    PlayRoomsAction,
    PlayRoomsActionType,
    ICallbackGetPlayRoomsAction,
    ICallbackCreatePlayRoomAction,
} from "../action/play_rooms_action";

const initialState: PlayRoomsState = {
    playRooms: [],
    isLoading: false,
};

const playRoomsReducer: Reducer<PlayRoomsState, PlayRoomsAction> = (state = initialState, action: PlayRoomsAction): PlayRoomsState => {
    switch (action.type) {

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
            const _action = action as ICallbackCreatePlayRoomAction;
            if (action.isSuccess) {
                const playRooms = _action.item
                    ? state.playRooms.concat(_action.item.playRoom)
                    : state.playRooms;

                return Object.assign({}, state, {
                    playRooms: playRooms,
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
