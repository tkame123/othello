import {Action} from "redux";
import {
    IRequestAddActionItem,
    IRequestHiddenActionItem,
    ICallbackAddActionItem,
    ICallbackHiddenActionItem,
} from "./app_notification_message_action_item";

export enum AppNotificationMessageActionType {

    REQUEST_ADD = "APP_NOTIFICATION_REQUEST_ADD",
    CALLBACK_ADD = "APP_NOTIFICATION_CALLBACK_ADD",

    REQUEST_HIDDEN = "APP_NOTIFICATION_REQUEST_HIDDEN",
    CALLBACK_HIDDEN = "APP_NOTIFICATION_CALLBACK_HIDDEN",

}

export interface IRequestAddAction extends Action {
    type: AppNotificationMessageActionType.REQUEST_ADD;
    item: IRequestAddActionItem;
}
export interface ICallbackAddAction extends Action {
    type: AppNotificationMessageActionType.CALLBACK_ADD;
    isSuccess: boolean;
    item?: ICallbackAddActionItem;
}

export interface IRequestHiddenAction extends Action {
    type: AppNotificationMessageActionType.REQUEST_HIDDEN;
    item: IRequestHiddenActionItem;
}
export interface ICallbackHiddenAction extends Action {
    type: AppNotificationMessageActionType.CALLBACK_HIDDEN;
    isSuccess: boolean;
    item?: ICallbackHiddenActionItem;
}

export type AppNotificationMessageAction =
    IRequestAddAction |
    ICallbackAddAction |
    IRequestHiddenAction |
    ICallbackHiddenAction

export interface IAppNotificationMessageActionCreator {
    requestAddAction(item: IRequestAddActionItem): IRequestAddAction;
    callbackAddAction(isSuccess: boolean, item?: ICallbackAddActionItem): ICallbackAddAction;

    requestHiddenAction(item: IRequestHiddenActionItem): IRequestHiddenAction;
    callbackHiddenAction(isSuccess: boolean, item?: ICallbackHiddenActionItem): ICallbackHiddenAction;

}

class ActionCreator implements IAppNotificationMessageActionCreator {

    public requestAddAction = (item: IRequestAddActionItem): IRequestAddAction => {
        return {
            type: AppNotificationMessageActionType.REQUEST_ADD,
            item,
        };
    };
    public callbackAddAction = (
        isSuccess: boolean,
        item?: ICallbackAddActionItem,
    ): ICallbackAddAction => {
        return {
            type: AppNotificationMessageActionType.CALLBACK_ADD,
            isSuccess,
            item,
        };
    };

    public requestHiddenAction = (item: IRequestHiddenActionItem): IRequestHiddenAction => {
        return {
            type: AppNotificationMessageActionType.REQUEST_HIDDEN,
            item,
        };
    };
    public callbackHiddenAction = (
        isSuccess: boolean,
        item?: ICallbackHiddenActionItem,
    ): ICallbackHiddenAction => {
        return {
            type: AppNotificationMessageActionType.CALLBACK_HIDDEN,
            isSuccess,
            item,
        };
    };

}

export const createAppNotificationMessageActionCreator = (): IAppNotificationMessageActionCreator => {
    return new ActionCreator();
};
