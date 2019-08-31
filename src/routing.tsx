import * as React from "react";
import {Redirect, Route, Switch} from 'react-router-dom';
import {AppState} from "./presentation/store/app_state";
import {connect} from "react-redux";

import GameContainer from "./presentation/container/game_container";

interface IProps {
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

export default connect(mapStateToProps)(Routing);
