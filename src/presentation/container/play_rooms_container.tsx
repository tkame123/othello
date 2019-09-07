import * as React from "react";
import {Action, Dispatch} from "redux";
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {createPlayroomsActionCreator} from "../action/play_rooms_action"
import {createPlayRoomsDispatcher, IPlayRoomsDispatcher,} from "../dispatcher/play_rooms_dispatcher";
import {createAppNotificationMessageActionCreator} from "../action/app_notification_message_action"
import {
    createAppNotificationMessageDispatcher,
    IAppNotificationMessageDispatcher,
} from "../dispatcher/app_notification_message_dispatcher";
import {IRequestCreatePlayRoomActionItem,} from "../action/play_rooms_action_item";
import {AppState} from "../store/app_state";
import {AuthState} from "../store/auth_state";
import {PlayRoomsState} from "../store/play_rooms_state";
import PlayRoomsComponent from "../component/play_rooms/play_rooms";
import {PlayRoom} from "../../domain/model/play_room";
import {User} from "../../domain/model/user";
import {AppNotificationType} from "../../domain/model/app_notification_message";

interface IProps extends RouteComponentProps<{}>{
    state: PlayRoomsState;
    authState: AuthState;
    dispatcher: IPlayRoomsDispatcher;
    noticeDispatcher: IAppNotificationMessageDispatcher;
}

interface IState {
    isInit: boolean,
}

export class PlayRoomsContainer extends React.Component <IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isInit: false,
        };
    };

    public componentDidMount() {
        this.props.dispatcher.initPlayRooms({});
    }

    public componentWillUnmount(): void {
        this.props.dispatcher.finalPlayRooms({});
    }

    public render(): JSX.Element {

        const {state} = this.props;
        const {isInit} = this.state;

        const isLoading: boolean = state.isLoading;
        const playRooms: PlayRoom[] = state.playRooms;

        return (
            <PlayRoomsComponent
                isInit={isInit}
                isLoading={isLoading}
                playRooms={playRooms}
                handleCreatePlayRooms={this.handleCreatePlayRooms}
            />
        )

    };

    private handleCreatePlayRooms = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        if (!this.props.authState.user) {
            this.props.noticeDispatcher.add({ type: AppNotificationType.WARN, message: "Need LogIn!!" });
            return
        }
        const owner : User = this.props.authState.user;
        const req: IRequestCreatePlayRoomActionItem = { owner };
        this.props.dispatcher.createPlayRoom(req);
    };

    // private handleDeletePlayRooms = (playRooms: PlayRoom[]) => (event: React.MouseEvent<HTMLButtonElement>): void => {
    //     event.preventDefault();
    //     if (playRooms.length === 0) {
    //         this.props.noticeDispatcher.add({ type: AppNotificationType.WARN, message: "No Targets" });
    //         return
    //     }
    //     this.props.dispatcher.deletePlayRoom({playRooms});
    // }

}


const mapStateToProps = (state: AppState) => {
    return {
        state: state.playRoomsReducer,
        authState: state.authReducer,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
    return {
        dispatcher: createPlayRoomsDispatcher(dispatch, createPlayroomsActionCreator()),
        noticeDispatcher: createAppNotificationMessageDispatcher(dispatch, createAppNotificationMessageActionCreator()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayRoomsContainer);
