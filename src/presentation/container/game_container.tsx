import * as React from "react";
import {Action, Dispatch} from "redux";
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {createGameActionCreator} from "../action/game_action"
import {
    createGameDispatcher,
    IGameDispatcher,
} from "../dispatcher/game_dispatcher";
import {AppState} from "../store/app_state";
import {GameState} from "../store/game_state";
import {IRequestCreateGameActionItem, IRequestUpdateGameActionItem} from "../action/game_action_item";
import {User} from "../../domain/model/user";
import {Game, GameTree, Score} from "../../domain/model/game";
import {config} from "../../util/config";
import GameBoard from "../component/gameboard";
import Progress from "../component/common/progress";

const size: number = config().board.size;

interface IProps extends RouteComponentProps<{}>{
    state: GameState;
    dispatcher: IGameDispatcher;
}

interface IState {
    isInit: boolean,
}

export class GameContainer extends React.Component <IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isInit: false,
        };
    };

    public componentDidMount() {
        const playerWhite: User = User.New("white@local");
        const playerBlack: User = User.New("black@local");
        const req: IRequestCreateGameActionItem = { playerWhite, playerBlack }
        this.props.dispatcher.createGame(req);
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

        const game: Game | null = state.game;
        const gameTree: GameTree | null = state.gameTree;
        const score: Score | null = state.score;

        if (isInit) { return <Progress/>}
        if (!game || !gameTree) { return <div>初期化失敗</div>}

        return (
            <GameBoard
                isLoading={isLoading}
                size={size}
                game={game}
                gameTree={gameTree}
                score={score}
                handleCreateNewGame={this.handleCreateNewGame}
                handleUpdateGameTree={this.handleUpdateGameTree}
            />
        )

    };

    private handleCreateNewGame = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        const playerWhite: User = User.New("white@local");
        const playerBlack: User = User.New("black@local");
        const req: IRequestCreateGameActionItem = { playerWhite, playerBlack }
        this.props.dispatcher.createGame(req);
    };

    private handleUpdateGameTree = (gameTreePromise: GameTree) => (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        if (!this.props.state.game) { throw new Error("")}
        const req: IRequestUpdateGameActionItem = { game: this.props.state.game ,gameTreePromise: gameTreePromise};
        this.props.dispatcher.updateGame(req);
    };

}


const mapStateToProps = (state: AppState) => {
    return {
        state: state.gameReducer,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
    return {
        dispatcher: createGameDispatcher(dispatch, createGameActionCreator()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
