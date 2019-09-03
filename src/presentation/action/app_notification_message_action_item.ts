import {AppNotificationMessage, AppNotificationType} from "../../domain/model/app_notification_message";

export interface IRequestAddActionItem {
    type: AppNotificationType,
    message: string,
}
export interface ICallbackAddActionItem {
    appNotificationMessage: AppNotificationMessage;
}


export interface IRequestHiddenActionItem {
    id: string,
}
export interface ICallbackHiddenActionItem {
    appNotificationMessages: AppNotificationMessage[],
}
