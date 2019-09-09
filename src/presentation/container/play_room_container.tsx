import * as React from "react";
import {Action, Dispatch} from "redux";
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {createPlayroomActionCreator} from "../action/play_room_action"
import {createPlayRoomDispatcher, IPlayRoomDispatcher,} from "../dispatcher/play_room_dispatcher";
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
import {Vote, VoteEventType} from "../../domain/model/vote";
import {Game} from "../../domain/model/game";

interface IProps extends RouteComponentProps<{playRoomId: string}>{
    state: PlayRoomState;
    authState: AuthState;
    visitorsState: VisitorsState;
    dispatcher: IPlayRoomDispatcher;
    visitorsDispatcher: IVisitorsDispatcher;
    noticeDispatcher: IAppNotificationMessageDispatcher;
}

interface IState {
    isInit: boolean,
    isModalForVoteGameReady: boolean,
}

export class PlayRoomContainer extends React.Component <IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isInit: false,
            isModalForVoteGameReady: false,
        };
    };

    public componentDidMount() {
        const playRoomId: string = this.props.match.params.playRoomId;
        this.props.dispatcher.initPlayRoom({playRoomId});
    }

    public componentWillUnmount(): void {
        if (this.props.authState.user) {
            this.props.visitorsDispatcher.updateVisitor({userId: this.props.authState.user.id, playRoomId: null})
        }
        this.props.dispatcher.finalPlayRoom({});
    }

    public shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        const game: Game | null = this.props.state.game;
        const playerBlack: User | null = this.props.state.playRoom && this.props.state.playRoom.playerBlack;
        const playerWhite: User | null = this.props.state.playRoom && this.props.state.playRoom.playerWhite;
        const nextPlayerBlack: User | null = nextProps.state.playRoom && nextProps.state.playRoom.playerBlack;
        const nextPlayerWhite: User | null = nextProps.state.playRoom && nextProps.state.playRoom.playerWhite;
        const votes: Vote[] = this.props.state.votes;
        const nextVotes: Vote[] = nextProps.state.votes;

        const playRoomId: string = this.props.match.params.playRoomId;
        const eventType: VoteEventType = VoteEventType.VoteEvent_GAME_READY;

        if (!game && nextPlayerBlack && nextPlayerWhite && (playerBlack === null || playerWhite === null)) {
            this.props.dispatcher.deleteVoteGameReady({playRoomId, eventType});
            this.setState({isModalForVoteGameReady: true});
            return false;
        }
        if (!game && playerBlack && playerWhite && (nextPlayerBlack === null || nextPlayerWhite === null)) {
            this.props.dispatcher.deleteVoteGameReady({playRoomId, eventType});
            this.setState({isModalForVoteGameReady: false});
            return false;
        }

        if (!game && votes.length !== nextVotes.length && nextVotes.length === 2) {
            this.props.dispatcher.deleteVoteGameReady({playRoomId, eventType});
            this.handleCreateNewGame();
        }

        return true;
    }


    public render(): JSX.Element {

        const {state, authState, visitorsState} = this.props;
        const {isModalForVoteGameReady} = this.state;
        const {isInit} = this.state;

        const isLoading: boolean = state.isLoading;
        const playRoom: PlayRoom | null = state.playRoom;
        const visitors: Visitor[] = visitorsState.visitors;

        const user: User | null = authState.user;

        console.log(isModalForVoteGameReady);

        return (
            <PlayRoomComponent
                isInit={isInit}
                isLoading={isLoading}
                isModalForVoteGameReady={isModalForVoteGameReady}
                user={user}
                playRoom={playRoom}
                visitors={visitors}
                handleUpdatePlayRoomPlayer={this.handleUpdatePlayRoomPlayer}
                handleCreateNewGame={this.handleCreateNewGame}
                handleVoteGameReadyCreate={this.handleVoteGameReadyCreate}
                handleVoteGameReadyDelete={this.handleVoteGameReadyDelete}
            />
        )
    };

    private handleVoteGameReadyCreate = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        const user: User | null = this.props.authState.user;
        if (!user) {
            this.props.noticeDispatcher.add({ type: AppNotificationType.WARN, message: "Need Login" });
            return
        }
        const playRoomId: string = this.props.match.params.playRoomId;
        const eventType: VoteEventType = VoteEventType.VoteEvent_GAME_READY;
        const userId: string = user.id;
        const message: string = user.email;
        this.props.dispatcher.createVoteGameReady({playRoomId, eventType, userId, message});
        this.setState({isModalForVoteGameReady: false});
    };

    private handleVoteGameReadyDelete = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        const playRoomId: string = this.props.match.params.playRoomId;
        const eventType: VoteEventType = VoteEventType.VoteEvent_GAME_READY;
        this.props.dispatcher.deleteVoteGameReady({playRoomId, eventType});
    };

    private handleUpdatePlayRoomPlayer = (playerBlack: User | null, playerWhite: User |null ) => (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        const playRoomId: string = this.props.match.params.playRoomId;
        const gameId = null;
        this.props.dispatcher.updatePlayRoomPlayer({playRoomId, gameId, playerBlack, playerWhite});
    };

    private handleCreateNewGame = (event?: React.MouseEvent<HTMLButtonElement>): void => {
        // event.preventDefault();
        if (!(this.props.state.playRoom && this.props.state.playRoom.playerBlack && this.props.state.playRoom.playerWhite)) {
            this.props.noticeDispatcher.add({ type: AppNotificationType.WARN, message: "Need Player" });
            return
        }
        const playRoomId: string = this.props.match.params.playRoomId;
        const playerBlack: User = this.props.state.playRoom.playerBlack;
        const playerWhite: User = this.props.state.playRoom.playerWhite;
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
