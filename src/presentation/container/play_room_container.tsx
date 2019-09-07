import * as React from "react";
import {Action, Dispatch} from "redux";
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {createPlayroomActionCreator} from "../action/play_room_action"
import {
    createPlayRoomDispatcher,
    IPlayRoomDispatcher,
} from "../dispatcher/play_room_dispatcher";
import {AppState} from "../store/app_state";
import {AuthState} from "../store/auth_state";
import {VisitorsState} from "../store/visitors_state";
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
import {createVisitorsDispatcher, IVisitorsDispatcher} from "../dispatcher/visitors_dispatcher";
import {createVisitorsActionCreator} from "../action/visitors_action";
import {Visitor} from "../../domain/model/visitor";

interface IProps extends RouteComponentProps<{id: string}>{
    state: PlayRoomState;
    authState: AuthState;
    visitorsState: VisitorsState;
    dispatcher: IPlayRoomDispatcher;
    visitorsDispatcher: IVisitorsDispatcher;
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
        this.props.dispatcher.getPlayRoom({id: id});
        if (this.props.authState.user) {
            this.props.visitorsDispatcher.updateVisitor({userId: this.props.authState.user.id, playRoomId: id})
        }
    }

    public componentWillUnmount(): void {
        if (this.props.authState.user) {
            this.props.visitorsDispatcher.updateVisitor({userId: this.props.authState.user.id, playRoomId: null})
        }
    }

    public render(): JSX.Element {

        const {state, visitorsState} = this.props;
        const {isInit} = this.state;

        const isLoading: boolean = state.isLoading;
        const playRoom: PlayRoom | null = state.playRoom;
        const visitors: Visitor[] = visitorsState.visitors;

        return (
            <PlayRoomComponent
                isInit={isInit}
                isLoading={isLoading}
                playRoom={playRoom}
                visitors={visitors}
                handleCreateNewGame={this.handleCreateNewGame}
            />
        )

    };

    private handleCreateNewGame = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        // PlayRoomのオーナが先手（黒）の固定ルールにて実装
        if (!this.props.state.playRoom || !this.props.authState.user) {
            this.props.noticeDispatcher.add({ type: AppNotificationType.WARN, message: "Need LogIn!!" });
            return
        }
        // ToDo: 仮にていったん認証ユーザでつくる
        const playRoomId: string = this.props.match.params.id;
        const playerBlack: User = this.props.authState.user;
        const playerWhite: User = this.props.authState.user;
        const boardSize: number = config().board.size;
        this.props.dispatcher.createGameOnPlayRoom({ playRoomId, boardSize, playerBlack, playerWhite });
    };

}


const mapStateToProps = (state: AppState) => {
    return {
        state: state.playRoomReducer,
        authState: state.authReducer,
        visitorsState: state.visitorsReducer,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
    return {
        dispatcher: createPlayRoomDispatcher(dispatch, createPlayroomActionCreator()),
        visitorsDispatcher: createVisitorsDispatcher(dispatch, createVisitorsActionCreator()),
        noticeDispatcher: createAppNotificationMessageDispatcher(dispatch, createAppNotificationMessageActionCreator()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayRoomContainer);
