import * as React from "react";
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom';
import {AppState} from "./presentation/store/app_state";
import {connect} from "react-redux";

import RootPlayRoomContainer from "./presentation/container/root_play_room_container";
import PlayRoomsContainer from "./presentation/container/play_rooms_container";
import TopContainer from "./presentation/container/top_container";
import {AuthState} from "./presentation/store/auth_state";
import {AuthStateType} from "./domain/model/user";

import Progress from "./presentation/component/common/progress";

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

        const authState: AuthStateType = state.authState;

        if (authState === AuthStateType.INITIALIZING) { return <Progress />}

        return (
            <React.Fragment>

                {authState === AuthStateType.UNKNOWN &&
                    <Switch>
                        <Route path='/top' component={TopContainer}/>
                        <Redirect to="/top"/>
                    </Switch>
                }

                {authState === AuthStateType.LOGIN_USER &&
                    <Switch>
                        <Route path='/playrooms' component={PlayRoomsContainer}/>
                        <Route path='/playroom/:playRoomId' component={RootPlayRoomContainer}/>
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
