import {Action} from "redux";
import {IAppNotificationMessageActionCreator} from "../action/app_notification_message_action";
import {IRequestAddActionItem, IRequestHiddenActionItem} from "../action/app_notification_message_action_item";

export interface IAppNotificationMessageDispatcher {
    add(item: IRequestAddActionItem): void;
    hidden(item: IRequestHiddenActionItem): void;
}

class Dispatcher implements IAppNotificationMessageDispatcher {

    constructor(private dispatch: (action: Action) => void,
                private actionCreator: IAppNotificationMessageActionCreator) {

    }

    public add = (item: IRequestAddActionItem): void => {
        this.dispatch(this.actionCreator.requestAddAction(item));
    };

    public hidden = (item: IRequestHiddenActionItem): void => {
        this.dispatch(this.actionCreator.requestHiddenAction(item));
    };

}

export const createAppNotificationMessageDispatcher = (dispatch: (action: Action) => void, actionCreator: IAppNotificationMessageActionCreator): IAppNotificationMessageDispatcher => {
    return new Dispatcher(dispatch, actionCreator);
};
