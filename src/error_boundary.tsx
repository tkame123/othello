import * as React from "react";
import * as Sentry from '@sentry/browser';
import {ReactNode} from "react";

import FeedbackForError from "./FeedbackForError";
import {RouteComponentProps, withRouter} from "react-router";
import {connect} from "react-redux";
import {AppState} from "./presentation/store/app_state";
import {AuthState} from "./presentation/store/auth_state";

interface IProps extends RouteComponentProps<{}>{
    state: AuthState;
    children: ReactNode;
}

interface IState {
    hasError: boolean;
    eventId: string | null;
}

export class ErrorBoundary extends React.Component <IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            hasError: false,
            eventId: null,
        }
    }

    public componentDidCatch(error: any, errorInfo: any) {
        const email: string = this.props.state.user ? this.props.state.user.email :"UNKNOWN USER";

        Sentry.withScope(scope => {
            scope.setUser({"email": email});
            scope.setExtras(errorInfo);
            const eventId = Sentry.captureException(error);
            this.setState({eventId});
        });
        if (error) {
            this.setState({hasError: true} )
        }
    }

    public render(): ReactNode {
        if (this.state.hasError) {
            return <FeedbackForError handleClick={this.handleClick} />;
        }

        return this.props.children;
    }

    private handleClick = (): void => {
        const eventId: string = this.state.eventId
            ? this.state.eventId : "";
        Sentry.showReportDialog({
            title: "エラー内容の送信",
            subtitle: "",
            subtitle2: "",
            eventId });
    };

}

const mapStateToProps = (state: AppState) => {
    return {
        state: state.authReducer,
    };
};

export default (withRouter(connect(mapStateToProps)(ErrorBoundary)));
