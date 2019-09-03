import {AppNotificationMessage} from "../../domain/model/app_notification_message";

export type AppNotificationMessageState = {
    appNotificationMessages: AppNotificationMessage[],
    isLoading: boolean,
}
