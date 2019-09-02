import * as React from "react";
import {Action, Dispatch} from "redux";
import {RouteComponentProps, withRouter} from "react-router";
import {connect} from "react-redux";
import {createAuthActionCreator} from "../action/auth_action"
import {
    createAuthDispatcher,
    IAuthDispatcher,
} from "../dispatcher/auth_dispatcher";
import {
    IRequestLoginOnGoogleActionItem,
    IRequestLogoutActionItem,
} from "../action/auth_action_item";
import {AppState} from "../store/app_state";
import {AuthState} from "../store/auth_state";
import NavbarComponent from "../component/navbar/navbar";
import {User} from "../../domain/model/user";

interface IProps extends RouteComponentProps<{}>{
    state: AuthState;
    dispatcher: IAuthDispatcher;
}

interface IState {
    isInit: boolean,
}

export class NavbarContainer extends React.Component <IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isInit: false,
        };
    };

    public render(): JSX.Element {

        const {state} = this.props;

        const children: React.ReactNode = this.props.children;

        const user: User | null = state.user;
        const isLoading: boolean = state.isLoading;


        return (
            <NavbarComponent
                isLoading={isLoading}
                children={children}
                user={user}
                handleLoginOnGoogle={this.handleLoginOnGoogle}
                handleLogout={this.handleLogout}
            />
        )

    };

    private handleLoginOnGoogle = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        const req: IRequestLoginOnGoogleActionItem = {};
        this.props.dispatcher.loginOnGoogle(req);
    };

    private handleLogout = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        const req: IRequestLogoutActionItem = {};
        this.props.dispatcher.logout(req);
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
    };
};

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(NavbarContainer)));
