import {Reducer} from "redux";
import {PlayRoomState} from "../store/play_room_state";
import {
    PlayRoomAction,
    PlayRoomActionType,
    IListenerOnPlayRoomAction,
    IListenerOnVotesPlayRoomAction,
    ICallbackGetPlayRoomAction,
} from "../action/play_room_action";

const initialState: PlayRoomState = {
    playRoom: null,
    game: null,
    votes: [],
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
                    votes: state.votes,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    votes: state.votes,
                    isLoading: false,
                });
            }
        }

        case PlayRoomActionType.LISTENER_ON_VOTES_PLAY_ROOM: {
            const _action = action as IListenerOnVotesPlayRoomAction;
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    votes: _action.item ? _action.item.votes : [],
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    votes: state.votes,
                    isLoading: false,
                });
            }
        }

        case PlayRoomActionType.REQUEST_INIT_PLAY_ROOM: {
            return Object.assign({}, state, {
                playRoom: state.playRoom,
                game: state.game,
                votes: state.votes,
                isLoading: true,
            });
        }
        case PlayRoomActionType.CALLBACK_INIT_PLAY_ROOM: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    votes: state.votes,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    votes: state.votes,
                    isLoading: false,
                });
            }
        }

        case PlayRoomActionType.REQUEST_FINAL_PLAY_ROOM: {
            return Object.assign({}, state, {
                playRoom: state.playRoom,
                game: state.game,
                votes: state.votes,
                isLoading: true,
            });
        }
        case PlayRoomActionType.CALLBACK_FINAL_PLAY_ROOM: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRoom: null,
                    game: null,
                    votes: [],
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    votes: state.votes,
                    isLoading: false,
                });
            }
        }

        case PlayRoomActionType.REQUEST_GET_PLAY_ROOM: {
            return Object.assign({}, state, {
                playRoom: state.playRoom,
                game: state.game,
                votes: state.votes,
                isLoading: true,
            });
        }
        case PlayRoomActionType.CALLBACK_GET_PLAY_ROOM: {
            const _action = action as ICallbackGetPlayRoomAction;
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRoom: _action.item ? _action.item.playRoom : null,
                    game: _action.item ? _action.item.game : null,
                    votes: state.votes,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    votes: state.votes,
                    isLoading: false,
                });
            }
        }

        case PlayRoomActionType.REQUEST_CREATE_GAME_ON_PLAY_ROOM: {
            return Object.assign({}, state, {
                playRoom: state.playRoom,
                game: state.game,
                votes: state.votes,
                isLoading: true,
            });
        }
        case PlayRoomActionType.CALLBACK_CREATE_GAME_ON_PLAY_ROOM: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    votes: state.votes,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    votes: state.votes,
                    isLoading: false,
                });
            }
        }

        case PlayRoomActionType.REQUEST_UPDATE_PLAY_ROOM_PLAYER: {
            return Object.assign({}, state, {
                playRoom: state.playRoom,
                game: state.game,
                votes: state.votes,
                isLoading: true,
            });
        }
        case PlayRoomActionType.CALLBACK_UPDATE_PLAY_ROOM_PLAYER: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    votes: state.votes,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    votes: state.votes,
                    isLoading: false,
                });
            }
        }

        case PlayRoomActionType.REQUEST_CREATE_VOTE_GAME_READY: {
            return Object.assign({}, state, {
                playRoom: state.playRoom,
                game: state.game,
                votes: state.votes,
                isLoading: true,
            });
        }
        case PlayRoomActionType.CALLBACK_CREATE_VOTE_GAME_READY: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    votes: state.votes,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    votes: state.votes,
                    isLoading: false,
                });
            }
        }

        case PlayRoomActionType.REQUEST_DELETE_VOTE_GAME_READY: {
            return Object.assign({}, state, {
                playRoom: state.playRoom,
                game: state.game,
                votes: state.votes,
                isLoading: true,
            });
        }
        case PlayRoomActionType.CALLBACK_DELETE_VOTE_GAME_READY: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    votes: state.votes,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    playRoom: state.playRoom,
                    game: state.game,
                    votes: state.votes,
                    isLoading: false,
                });
            }
        }

        default:
            return state;
    }
};

export default playRoomReducer;
