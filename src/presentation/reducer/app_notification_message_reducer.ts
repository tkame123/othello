import {Reducer} from "redux";
import {AppNotificationMessageState} from "../store/app_notification_message_state";
import {
    AppNotificationMessageAction,
    AppNotificationMessageActionType,
    ICallbackAddAction,
    ICallbackHiddenAction,
} from "../action/app_notification_message_action";
import {config} from "../../util/config";

const initialState: AppNotificationMessageState = {
    appNotificationMessages: [],
    isLoading: false,
};

const appNotificationMessageReducer: Reducer<AppNotificationMessageState, AppNotificationMessageAction> = (state = initialState, action: AppNotificationMessageAction): AppNotificationMessageState => {
    switch (action.type) {

        case AppNotificationMessageActionType.REQUEST_ADD: {
            return Object.assign({}, state, {
                appNotificationMessages: state.appNotificationMessages,
                isLoading: true,
            });
        }
        case AppNotificationMessageActionType.CALLBACK_ADD: {
            const _action = action as ICallbackAddAction;
            if (action.isSuccess) {
                const items = _action.item
                    ? state.appNotificationMessages.concat(_action.item.appNotificationMessage)
                    : state.appNotificationMessages;
                if (items.length > config().appNotificationMessages.maxNotificationMessages ) { items.shift() }

                return Object.assign({}, state, {
                    appNotificationMessages: items,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    appNotificationMessages: state.appNotificationMessages,
                    isLoading: false,
                });
            }
        }

        case AppNotificationMessageActionType.REQUEST_HIDDEN: {
            return Object.assign({}, state, {
                appNotificationMessages: state.appNotificationMessages,
                isLoading: true,
            });
        }
        case AppNotificationMessageActionType.CALLBACK_HIDDEN: {
            const _action = action as ICallbackHiddenAction;
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    appNotificationMessages: _action.item ? _action.item.appNotificationMessages : state.appNotificationMessages,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    appNotificationMessages: state.appNotificationMessages,
                    isLoading: false,
                });
            }
        }

        default:
            return state;
    }
};

export default appNotificationMessageReducer;
