import {AuthState} from "./auth_state";
import {GameState} from "./game_state";
import {GamesState} from "./games_state";
import {PlayRoomState} from "./play_room_state";
import {PlayRoomsState} from "./play_rooms_state";

export type AppState = {
    authReducer: AuthState,

    gameReducer: GameState,
    gamesReducer: GamesState,
    playRoomReducer: PlayRoomState,
    playRoomsReducer: PlayRoomsState,
};
