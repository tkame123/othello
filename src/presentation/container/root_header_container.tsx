import * as React from "react";
import {Action, Dispatch} from "redux";
import {RouteComponentProps, withRouter} from "react-router";
import {connect} from "react-redux";
import {createAuthActionCreator} from "../action/auth_action"
import {
    createAuthDispatcher,
    IAuthDispatcher,
} from "../dispatcher/auth_dispatcher";
import {createVisitorsActionCreator} from "../action/visitors_action"
import {
    createVisitorsDispatcher,
    IVisitorsDispatcher,
} from "../dispatcher/visitors_dispatcher";
import {AppState} from "../store/app_state";
import AuthContainer from "./auth_container";
import AppNotificationContainer from "./app_notification_container";

interface IProps extends RouteComponentProps<{}>{
    authDispatcher: IAuthDispatcher;
    visitorsDispatcher: IVisitorsDispatcher;
}

interface IState {
    isInit: boolean,
}

export class RootHeaderContainer extends React.Component <IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isInit: false,
        };
    };

    public componentDidMount() {
        this.props.authDispatcher.initAuthUser({});
        this.props.visitorsDispatcher.initVisitor({});
    }

    public componentWillUnmount(): void {
        this.props.visitorsDispatcher.finalVisitors({});
        this.props.authDispatcher.finalAuthUser({});
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
        authDispatcher: createAuthDispatcher(dispatch, createAuthActionCreator()),
        visitorsDispatcher: createVisitorsDispatcher(dispatch, createVisitorsActionCreator()),
    };
};

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(RootHeaderContainer)));
