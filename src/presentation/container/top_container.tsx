import * as React from "react";
import {Action, Dispatch} from "redux";
import {RouteComponentProps, withRouter} from "react-router";
import {connect} from "react-redux";
import {createAuthActionCreator} from "../action/auth_action"
import {
    createAuthDispatcher,
    IAuthDispatcher,
} from "../dispatcher/auth_dispatcher";
import {AppState} from "../store/app_state";
import TopComponent from "../component/top/top";

interface IProps extends RouteComponentProps<{}>{
    authDispatcher: IAuthDispatcher;
}

interface IState {
    isInit: boolean,
}

export class TopContainer extends React.Component <IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isInit: false,
        };
    };

    public render(): JSX.Element {

        return (
            <>
                <TopComponent/>
            </>
        )
    };

}


const mapStateToProps = (state: AppState) => {
    return {
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
    return {
        authDispatcher: createAuthDispatcher(dispatch, createAuthActionCreator()),
    };
};

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(TopContainer)));
