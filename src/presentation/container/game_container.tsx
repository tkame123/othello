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
import {IRequestInitGameActionItem, IRequestUpdateGameActionItem} from "../action/game_action_item";
import {Game} from "../../domain/model/game";
import {config} from "../../util/config";
import GameComponent from "../component/game/game";
import Progress from "../component/common/progress";
import {Cell, GameTree, Score} from "../../domain/model/game_detail";

const size: number = config().board.size;

interface IProps extends RouteComponentProps<{id: string}>{
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
            isInit: true,
        };
    };

    public componentDidMount() {
        const id: string = this.props.match.params.id;
        const req: IRequestInitGameActionItem = {id};
        this.props.dispatcher.initGame(req);
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
            <GameComponent
                isLoading={isLoading}
                size={size}
                game={game}
                gameTree={gameTree}
                score={score}
                handleUpdateGameTree={this.handleUpdateGameTree}
            />
        )

    };

    private handleUpdateGameTree = (gameTreePromise: GameTree, cell: Cell) => (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        if (!this.props.state.gameTree) { throw new Error("")}
        if (!this.props.state.game) { throw new Error("")}
        const nextTurn: number = this.props.state.gameTree.turn + 1;
        const req: IRequestUpdateGameActionItem = { game: this.props.state.game, cell: cell, nextTurn: nextTurn };
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
