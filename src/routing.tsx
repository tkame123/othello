import * as React from "react";
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom';
import {AppState} from "./presentation/store/app_state";
import {connect} from "react-redux";

import PlayRoomsContainer from "./presentation/container/play_rooms_container";
import GameContainer from "./presentation/container/game_container";

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
                    <Route path='/gameboard' component={GameContainer}/>
                    <Redirect to="/gameboard" />
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
