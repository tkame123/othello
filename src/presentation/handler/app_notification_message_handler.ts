import {put, select, takeEvery, call, delay} from "redux-saga/effects";

import {AppNotificationMessage, TParamsAppNotificationMessageFrom} from "../../domain/model/app_notification_message";

import {
    AppNotificationMessageActionType,
    createAppNotificationMessageActionCreator,
    IAppNotificationMessageActionCreator,
    IRequestAddAction,
    IRequestHiddenAction,
} from "../action/app_notification_message_action";
import {AppState} from "../store/app_state";
import {AppNotificationMessageState} from "../store/app_notification_message_state";
import {config} from "../../util/config";
import {createId} from "../../util/id";

const actionCreator: IAppNotificationMessageActionCreator = createAppNotificationMessageActionCreator();

function* handleAddInAppNotificationMessage() {
    yield takeEvery(AppNotificationMessageActionType.REQUEST_ADD, execAddNotificationMessage)
}

function* execAddNotificationMessage(action: IRequestAddAction) {
    try {
        const params: TParamsAppNotificationMessageFrom = {
            id: createId(),
            type: action.item.type,
            message: action.item.message,
            createdAt: new Date(),
        };
        const item: AppNotificationMessage = AppNotificationMessage.from(params);
        yield put(actionCreator.callbackAddAction(true, { appNotificationMessage: item }));

        // HiddenActionを遅延発行
        yield call(delay, config().appNotificationMessages.delayTimeAppNotificationMessage);
        yield put(actionCreator.requestHiddenAction({ id: item.id }));

    } catch (error) {
        yield put(actionCreator.callbackAddAction(false));
    }

}

function* handleHiddenInAppNotificationMessage() {
    yield takeEvery(AppNotificationMessageActionType.REQUEST_HIDDEN, execHiddenNotificationMessage)
}

function* execHiddenNotificationMessage(action: IRequestHiddenAction) {
    try {
        // 現状のStateを取得し更新用のデータを作成する
        const selector = (state: AppState) => state.appNotificationMessageReducer;
        const _state: AppNotificationMessageState = yield select(selector);
        const items: AppNotificationMessage[] =
            _state.appNotificationMessages.map((item: AppNotificationMessage)=>{
                if (item.id === action.item.id) {
                    item.isHidden = true;
                    return item;
                } else {
                    return item;
                }
            });
        yield put(actionCreator.callbackHiddenAction(true, { appNotificationMessages: items }));
    } catch (error) {
        yield put(actionCreator.callbackHiddenAction(false));
    }

}

export {
    handleAddInAppNotificationMessage,
    handleHiddenInAppNotificationMessage,
};
