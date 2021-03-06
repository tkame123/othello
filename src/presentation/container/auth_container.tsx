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
import {AuthState} from "../store/auth_state";
import HeaderComponent from "../component/header/header";
import {User} from "../../domain/model/user";
import {createVisitorsDispatcher, IVisitorsDispatcher} from "../dispatcher/visitors_dispatcher";
import {createVisitorsActionCreator} from "../action/visitors_action";

interface IProps extends RouteComponentProps<{}>{
    state: AuthState;
    dispatcher: IAuthDispatcher;
    visitorsDispatcher: IVisitorsDispatcher;
}

interface IState {
    isInit: boolean,
    isOpenDrawnMenu: boolean,
}

export class AuthContainer extends React.Component <IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isInit: false,
            isOpenDrawnMenu: false,
        };
    };

    public render(): JSX.Element {

        const {state} = this.props;
        const user: User | null = state.user;
        const isLoading: boolean = state.isLoading;
        const isOpenDrawnMenu: boolean = this.state.isOpenDrawnMenu;

        return (
            <HeaderComponent
                isLoading={isLoading}
                isOpenDrawnMenu={isOpenDrawnMenu}
                user={user}
                handleDrawMenuToggle={this.handleDrawMenuToggle}
                handleLoginOnGoogle={this.handleLoginOnGoogle}
                handleLogout={this.handleLogout}
            />
        )

    };

    private handleDrawMenuToggle = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
        this.setState({isOpenDrawnMenu: !this.state.isOpenDrawnMenu});
    };

    private handleLoginOnGoogle = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        this.props.dispatcher.loginOnGoogle({});
    };

    private handleLogout = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        if (this.props.state.user) {
            this.props.dispatcher.logout({});
        }
    };

}


const mapStateToProps = (state: AppState) => {
    return {
        state: state.authReducer,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
    return {
        dispatcher: createAuthDispatcher(dispatch, createAuthActionCreator()),
        visitorsDispatcher: createVisitorsDispatcher(dispatch, createVisitorsActionCreator()),
    };
};

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthContainer)));
