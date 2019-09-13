import * as React from "react";
import {Action, Dispatch} from "redux";
import {RouteComponentProps, withRouter} from "react-router";
import {connect} from "react-redux";
import {createGameActionCreator} from "../action/game_action"
import {
    createGameDispatcher,
    IGameDispatcher,
} from "../dispatcher/game_dispatcher";
import {AppState} from "../store/app_state";
import {GameState} from "../store/game_state";
import {AuthState} from "../store/auth_state";
import {Game} from "../../domain/model/game";
import GameComponent from "../component/game/game";
import {Cell, GameDetail, GameTree, Move} from "../../domain/model/game_detail";
import {User} from "../../domain/model/user";
import {Score} from "../../domain/model/score";
import {
    createAppNotificationMessageDispatcher,
    IAppNotificationMessageDispatcher
} from "../dispatcher/app_notification_message_dispatcher";
import {createAppNotificationMessageActionCreator} from "../action/app_notification_message_action";
import {AppNotificationType} from "../../domain/model/app_notification_message";

interface IProps extends RouteComponentProps<{playRoomId: string}>{
    gameId: string;
    state: GameState;
    authState: AuthState;
    dispatcher: IGameDispatcher;
    noticeDispatcher: IAppNotificationMessageDispatcher;
}

interface IState {
    isInit: boolean,
}

export class GameContainer extends React.Component <IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isInit: true,
        };
    };

    public componentDidMount() {
        const gameId: string = this.props.gameId;
        this.props.dispatcher.initGame({gameId});
    }

    public componentWillUnmount(): void {
        this.props.dispatcher.finalGame({});
    }

    public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        // init処理の終了
        const isInitFinished: boolean = this.state.isInit && !this.props.state.isLoading && prevProps.state.isLoading;
        if (isInitFinished) { return this.setState({isInit: false}) }
    }

    public render(): JSX.Element {

        const {state, authState} = this.props;
        const {isInit} = this.state;

        const isLoading: boolean = state.isLoading;

        const game: Game | null = state.game;
        const gameTree: GameTree | null = state.gameTree;
        const gameDetails: GameDetail[] = state.gameDetails;
        const score: Score | null = state.score;
        const myPlayer: User | null = authState.user;

        return (
            <GameComponent
                isInit={isInit}
                isLoading={isLoading}
                myPlayer={myPlayer}
                game={game}
                gameTree={gameTree}
                gameDetails={gameDetails}
                score={score}
                handleToggleBoard={this.handleToggleBoard}
                handleSurrender={this.handleSurrender}
            />
        )

    };

    private handleSurrender = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        const game: Game | null = this.props.state.game;
        const gameTree: GameTree | null = this.props.state.gameTree;
       if (game === null || gameTree === null ) {
           this.props.noticeDispatcher.add({ type: AppNotificationType.WARN, message: "Not In Game" });
           return
       }
       this.props.dispatcher.finishGame({game, gameTree});
    };

    private handleToggleBoard = (cell: Cell , isPlayer: boolean, isMyTurn: boolean) => (event: React.MouseEvent<HTMLTableDataCellElement>): void => {
        event.preventDefault();
        if (!this.props.state.gameTree || !this.props.state.game) {
            this.props.noticeDispatcher.add({ type: AppNotificationType.WARN, message: "Need LogIn!!" });
            return
        }
        if (!isPlayer || !isMyTurn ) { return }
        const moves: Move[] = this.props.state.gameTree.moves;
        const finded: Move | undefined = moves.find((item: Move): boolean => {
            if (item.cell === null) { return false }
            return  (item.cell.x === cell.x) && (item.cell.y === cell.y);
        });
        if (!finded) { return }
        const nextTurn: number = this.props.state.gameTree.turn + 1;
        this.props.dispatcher.updateGame({ game: this.props.state.game, cell: cell, nextTurn: nextTurn });
    };

}


const mapStateToProps = (state: AppState) => {
    return {
        state: state.gameReducer,
        authState: state.authReducer,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
    return {
        dispatcher: createGameDispatcher(dispatch, createGameActionCreator()),
        noticeDispatcher: createAppNotificationMessageDispatcher(dispatch, createAppNotificationMessageActionCreator()),
    };
};

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(GameContainer)));
