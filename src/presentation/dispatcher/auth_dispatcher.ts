import {Action} from "redux";
import {IAuthActionCreator} from "../action/auth_action";

import {
    IRequestGetAuthUserActionItem,
    IRequestLoginOnGoogleActionItem,
    IRequestLogoutActionItem,
} from "../action/auth_action_item"

export interface IAuthDispatcher {

    getAuthUser(item: IRequestGetAuthUserActionItem): void;

    loginOnGoogle(item: IRequestLoginOnGoogleActionItem): void;

    logout(item: IRequestLogoutActionItem): void;

}

class Dispatcher implements IAuthDispatcher {

    constructor(private dispatch: (action: Action) => void,
                private actionCreator: IAuthActionCreator) {};

    public getAuthUser = (item: IRequestGetAuthUserActionItem,): void => {
        this.dispatch(this.actionCreator.requestGetAuthUserAction(item));};

    public loginOnGoogle = (item: IRequestLoginOnGoogleActionItem,): void => {
        this.dispatch(this.actionCreator.requestLoginOnGoogleAction(item));};

    public logout = (item: IRequestLogoutActionItem,): void => {
        this.dispatch(this.actionCreator.requestLogoutAction(item));};

}

export const createAuthDispatcher = (dispatch: (action: Action) => void, actionCreator: IAuthActionCreator): IAuthDispatcher => {
    return new Dispatcher(dispatch, actionCreator);
};
