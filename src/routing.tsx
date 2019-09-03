import * as React from "react";
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom';
import {AppState} from "./presentation/store/app_state";
import {connect} from "react-redux";

import PlayRoomContainer from "./presentation/container/play_room_container";
import PlayRoomsContainer from "./presentation/container/play_rooms_container";
import GameContainer from "./presentation/container/game_container";
import GamesContainer from "./presentation/container/games_container";

interface IProps extends RouteComponentProps<{}>{
}

interface IState {
}

export class Routing extends React.Component<IProps, IState> {

    // constructor(props: IProps) {
    //     super(props);
    // }

    public render() {

        return (
            <React.Fragment>
                <Switch>
                    <Route path='/playrooms' component={PlayRoomsContainer}/>
                    <Route path='/playroom/:id' component={PlayRoomContainer}/>
                    <Route path='/games' component={GamesContainer}/>
                    <Route path='/game/:id' component={GameContainer}/>
                    <Redirect to="/playrooms" />
                </Switch>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    return {
    };
};

export default withRouter(connect(mapStateToProps)(Routing));
