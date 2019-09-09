import * as React from "react";
import {Action, Dispatch} from "redux";
import {RouteComponentProps, withRouter} from "react-router";
import {connect} from "react-redux";
import {
    createAppNotificationMessageDispatcher,
    IAppNotificationMessageDispatcher,
} from "../dispatcher/app_notification_message_dispatcher";
import {
    createAppNotificationMessageActionCreator,
} from "../action/app_notification_message_action";
import {AppState} from "../store/app_state";
import {AppNotificationMessageState} from "../store/app_notification_message_state";

import NotificationBarComponent from "../component/notification/app_notification";
import {AppNotificationMessage} from "../../domain/model/app_notification_message";

interface IProps extends RouteComponentProps<{}>{
    state: AppNotificationMessageState;
    dispatcher: IAppNotificationMessageDispatcher;
}

interface IState {
    isInit: boolean,
}

export class AppNotificationContainer extends React.Component <IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isInit: false,
        };
    };

    public render(): JSX.Element {

        const {state} = this.props;

        const appNotificationMessages: AppNotificationMessage[] = state.appNotificationMessages;

        return (
            <NotificationBarComponent
                appNotificationMessages={appNotificationMessages}
                handleOnCloseNotification={this.handleOnCloseNotification}
            />
        )

    };

    private handleOnCloseNotification = (id:string) => (event: any) => {
        this.props.dispatcher.hidden({id})
    };

}


const mapStateToProps = (state: AppState) => {
    return {
        state: state.appNotificationMessageReducer,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
    return {
        dispatcher: createAppNotificationMessageDispatcher(dispatch, createAppNotificationMessageActionCreator()),
    };
};

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(AppNotificationContainer)));
