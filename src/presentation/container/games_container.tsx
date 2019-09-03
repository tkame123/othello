import * as React from "react";
import {Action, Dispatch} from "redux";
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {createGamesActionCreator} from "../action/games_action"
import {
    createGamesDispatcher,
    IGamesDispatcher,
} from "../dispatcher/games_dispatcher";
import {AppState} from "../store/app_state";
import {AuthState} from "../store/auth_state";
import {GamesState} from "../store/games_state";
import GamesComponent from "../component/games/games";
import Progress from "../component/common/progress";
import {Game} from "../../domain/model/game";

interface IProps extends RouteComponentProps<{}>{
    state: GamesState;
    authState: AuthState;
    dispatcher: IGamesDispatcher;
}

interface IState {
    isInit: boolean,
}

export class GamesContainer extends React.Component <IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isInit: false,
        };
    };

    public componentDidMount() {
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

        const games: Game[] = state.games;

        if (isInit) { return <Progress/>}
        if (!games) { return <div>初期化失敗</div>}

        return (
            <GamesComponent
                isLoading={isLoading}
                games={games}
            />
        )

    };

}


const mapStateToProps = (state: AppState) => {
    return {
        state: state.gamesReducer,
        authState: state.authReducer,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
    return {
        dispatcher: createGamesDispatcher(dispatch, createGamesActionCreator()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GamesContainer);
