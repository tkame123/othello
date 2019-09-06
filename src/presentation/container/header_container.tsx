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
import AuthContainer from "./auth_container";
import AppNotificationContainer from "./app_notification";

interface IProps extends RouteComponentProps<{}>{
    dispatcher: IAuthDispatcher;
}

interface IState {
    isInit: boolean,
}

export class HeaderContainer extends React.Component <IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isInit: false,
        };
    };

    public componentDidMount() {
        this.props.dispatcher.initAuthUser({});
    }

    public componentWillUnmount(): void {
        this.props.dispatcher.finalAuthUser({});
    }

    public render(): JSX.Element {

        const children: React.ReactNode = this.props.children;

        return (
            <>
                <AuthContainer />
                <AppNotificationContainer />
                {children}
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
        dispatcher: createAuthDispatcher(dispatch, createAuthActionCreator()),
    };
};

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)));
