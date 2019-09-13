import * as React from "react";
import {Action, Dispatch} from "redux";
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {AppState} from "../store/app_state";
import PlayRoomContainer from "./play_room_container";
import GameContainer from "./game_container";
import {PlayRoomState} from "../store/play_room_state";

interface IProps extends RouteComponentProps<{playRoomId: string}>{
    playRoomState: PlayRoomState;
}

interface IState {
}

type TParams = {
    gameId: string,
};

// ToDo: 直接リンクうまく動かない問題
export class RootPlayRoomContainer extends React.Component <IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
        };
    };

    public componentDidMount() {
        // 直接アクセスの際のデータ取得
        const params: TParams = this.helperForPrams(this.props.location.search);
        this.pushQueryString(params);
    }

    public componentWillReceiveProps(nextProps: Readonly<IProps>, nextContext: any): void {
        // URL遷移の際のデータ取得
        if (nextProps.location !== this.props.location) {
            // const nextParams: TParams = this.helperForPrams(nextProps.location.search);
            // const pager: Pager = new Pager(params.activePage, defaultOffset);
            // const req: SearchProjectListByCustomerRequest = new SearchProjectListByCustomerRequest();
            // req.page = pager.page;
            // req.offset = pager.offset;
            // req.q = params.query;
            // if (params.occupation) {req.occupation = params.occupation}
            // if (params.workingHourRange) {req.workingHourRange = params.workingHourRange}
            // if (params.paymentRange) {req.paymentRange = params.paymentRange}
            // if (params.workingDuration) {req.workingDuration = params.workingDuration}
            // this.props.dispatcher.searchProjectList(req);
        }
    }

    public render(): JSX.Element {
        const {playRoomState} = this.props;

        const gameId: string | null = playRoomState.playRoom && playRoomState.playRoom.gameId ?  playRoomState.playRoom && playRoomState.playRoom.gameId : null;

        return (
            <>
                <PlayRoomContainer/>

                {gameId && gameId !== null && gameId !== "" &&
                    <GameContainer
                        gameId={gameId}
                    />
                }
            </>
        )
    };

    private helperForPrams = (urlSearchParams: any): TParams => {
        const uRLSearchParams = new URLSearchParams(urlSearchParams);
        const gameId: string = uRLSearchParams.get('g') ? String(uRLSearchParams.get('g')): "";
        return {gameId};
    };

    private pushQueryString = (query: TParams): void => {
        const {location, history} = this.props;
        const uRLSearchParams = new URLSearchParams(location.search);
        uRLSearchParams.set('g', String(query.gameId));
        history.push({
            search: uRLSearchParams.toString(),
        });

    };

}


const mapStateToProps = (state: AppState) => {
    return {
        playRoomState: state.playRoomReducer,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RootPlayRoomContainer);
