import * as React from "react";
import {Action, Dispatch} from "redux";
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {createPlayroomsActionCreator} from "../action/play_rooms_action"
import {
    createPlayRoomsDispatcher,
    IPlayRoomsDispatcher,
} from "../dispatcher/play_rooms_dispatcher";
import {
    // IRequestGetPlayRoomsActionItem,
    IRequestCreatePlayRoomActionItem,
} from "../action/play_rooms_action_item";
import {AppState} from "../store/app_state";
import {AuthState} from "../store/auth_state";
import {PlayRoomsState} from "../store/play_rooms_state";
import PlayRoomsComponent from "../component/play_rooms/play_rooms";
import Progress from "../component/common/progress";
import {PlayRoom} from "../../domain/model/play_room";
import {User} from "../../domain/model/user";

interface IProps extends RouteComponentProps<{}>{
    state: PlayRoomsState;
    authState: AuthState;
    dispatcher: IPlayRoomsDispatcher;
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
        // const req: IRequestGetPlayRoomsActionItem = {};
        // this.props.dispatcher.getPlayRooms(req);
    }

    public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        // init処理の終了
        const isInitFinished: boolean = this.state.isInit && !this.props.state.isLoading && prevProps.state.isLoading;
        if (isInitFinished) { return this.setState({isInit: false}) }
    }

    public render(): JSX.Element {

        const {state} = this.props;
        const {isInit} = this.state;

        const isLoading: boolean = state.isLoading;

        const playRooms: PlayRoom[] = state.playRooms;

        if (isInit) { return <Progress/>}
        if (!playRooms) { return <div>初期化失敗</div>}

        return (
            <PlayRoomsComponent
                isLoading={isLoading}
                playRooms={playRooms}
                handleCreatePlayRooms={this.handleCreatePlayRooms}
            />
        )

    };

    private handleCreatePlayRooms = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        // ToDo: 仮実装
        if (!this.props.authState.user) { throw new Error("Need Logon") }
        const owner : User = this.props.authState.user;
        const req: IRequestCreatePlayRoomActionItem = { owner };
        this.props.dispatcher.createPlayRoom(req);
    };

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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayRoomsContainer);
