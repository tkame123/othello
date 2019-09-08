import * as React from "react";
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom';
import {AppState} from "./presentation/store/app_state";
import {connect} from "react-redux";

import PlayRoomContainer from "./presentation/container/play_room_container";
import PlayRoomsContainer from "./presentation/container/play_rooms_container";
import GameContainer from "./presentation/container/game_container";
import TopContainer from "./presentation/container/top_container";
import {AuthState} from "./presentation/store/auth_state";

interface IProps extends RouteComponentProps<{}>{
    state: AuthState;
}

interface IState {
}

export class Routing extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
        };
    }

    public render() {

        const {state} = this.props;

        const authState: boolean = state.authState;

        return (
            <React.Fragment>

                {!authState &&
                    <Switch>
                        <Route path='/top' component={TopContainer}/>
                        <Redirect to="/top"/>
                    </Switch>
                }

                {authState &&
                    <Switch>
                        <Route path='/playrooms' component={PlayRoomsContainer}/>
                        <Route path='/playroom/:id' component={PlayRoomContainer}/>
                        <Route path='/game/:id' component={GameContainer}/>
                        <Redirect to="/playrooms"/>
                    </Switch>
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        state: state.authReducer,
    };
};

export default withRouter(connect(mapStateToProps)(Routing));
