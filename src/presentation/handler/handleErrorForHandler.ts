import * as Sentry from '@sentry/browser';
import {Severity} from '@sentry/browser';
import {call, put, select} from "redux-saga/effects";
import {
    createAppNotificationMessageActionCreator,
    IAppNotificationMessageActionCreator,
} from "../action/app_notification_message_action";

import {AppError, ErrorType} from "../../domain/model/app_error";
import {AppNotificationType} from "../../domain/model/app_notification_message";
import {AppState} from "../store/app_state";
import {AuthState} from "../store/auth_state";

const actionCreatorForNotification: IAppNotificationMessageActionCreator = createAppNotificationMessageActionCreator();

const WarnList: ErrorType[] = [
];

const NotificationWhiteList: ErrorType[] = [
];

const SentryWhiteList: ErrorType[] = [
];

export function* handleErrorForHandler(error: AppError | any) {

    const error_type: ErrorType = error.type ? error.type : ErrorType.UNKNOWN;
    const error_code: string = error.code ? error.code : "UNKNOWN CODE";
    const isWarn: boolean = (WarnList.includes(error_type));

    // Sentry通知
    if (!SentryWhiteList.includes(error_type)) {
        const selector = (state: AppState) => state.authReducer;
        const authState: AuthState = yield select(selector);
        const email: string = authState.user && authState.user.email ? authState.user.email :"UNKNOWN USER";
        const level: Severity = isWarn ? Severity.Warning : Severity.Error;
        Sentry.configureScope((scope) => {
            scope.setUser({"email": email});
            scope.setLevel(level);
            scope.setExtra("info", {"error_code": error_code});
        });
        yield call(Sentry.captureException, error);
    }

    // Notification通知
    if (!NotificationWhiteList.includes(error_type)) {
        const type = isWarn ? AppNotificationType.WARN : AppNotificationType.ERROR;
        const message = error.message || error.toString();
        yield put(actionCreatorForNotification.requestAddAction({type, message}));
    }

}
