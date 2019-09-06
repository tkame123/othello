import * as React from "react";
import {Action, Dispatch} from "redux";
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {createPlayroomActionCreator} from "../action/play_room_action"
import {
    createPlayRoomDispatcher,
    IPlayRoomDispatcher,
} from "../dispatcher/play_room_dispatcher";
import {
    IRequestGetPlayRoomActionItem,
    IRequestCreateGameOnPlayRoomActionItem,
} from "../action/play_room_action_item";
import {AppState} from "../store/app_state";
import {AuthState} from "../store/auth_state";
import {PlayRoomState} from "../store/play_room_state";
import PlayRoomComponent from "../component/play_room/play_room";
import {PlayRoom} from "../../domain/model/play_room";
import {User} from "../../domain/model/user";

import {config} from "../../util/config";
import {
    createAppNotificationMessageDispatcher,
    IAppNotificationMessageDispatcher
} from "../dispatcher/app_notification_message_dispatcher";
import {createAppNotificationMessageActionCreator} from "../action/app_notification_message_action";
import {AppNotificationType} from "../../domain/model/app_notification_message";

interface IProps extends RouteComponentProps<{id: string}>{
    state: PlayRoomState;
    authState: AuthState;
    dispatcher: IPlayRoomDispatcher;
    noticeDispatcher: IAppNotificationMessageDispatcher;
}

interface IState {
    isInit: boolean,
}

export class PlayRoomContainer extends React.Component <IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isInit: false,
        };
    };

    public componentDidMount() {
        const id: string = this.props.match.params.id;
        const req: IRequestGetPlayRoomActionItem = {id};
        this.props.dispatcher.getPlayRoom(req);
    }

    public render(): JSX.Element {

        const {state} = this.props;
        const {isInit} = this.state;

        const isLoading: boolean = state.isLoading;
        const playRoom: PlayRoom | null = state.playRoom;

        return (
            <PlayRoomComponent
                isInit={isInit}
                isLoading={isLoading}
                playRoom={playRoom}
                handleCreateNewGame={this.handleCreateNewGame}
            />
        )

    };

    private handleCreateNewGame = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        // PlayRoomのオーナが先手（黒）の固定ルールにて実装
        if (!this.props.state.playRoom || !this.props.authState.user) {
            this.props.noticeDispatcher.add({ type: AppNotificationType.ERROR, message: "Unexpected error" });
            return
        }
        const id: string = this.props.match.params.id;
        const playerBlack: User = this.props.state.playRoom.owner;
        const playerWhite: User = this.props.authState.user;
        const boardSize: number = config().board.size;
        const req: IRequestCreateGameOnPlayRoomActionItem = { id, boardSize, playerBlack, playerWhite }
        this.props.dispatcher.createGameOnPlayRoom(req);
    };

}


const mapStateToProps = (state: AppState) => {
    return {
        state: state.playRoomReducer,
        authState: state.authReducer,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
    return {
        dispatcher: createPlayRoomDispatcher(dispatch, createPlayroomActionCreator()),
        noticeDispatcher: createAppNotificationMessageDispatcher(dispatch, createAppNotificationMessageActionCreator()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayRoomContainer);
